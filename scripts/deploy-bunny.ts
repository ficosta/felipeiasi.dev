// Publish dist/ to Bunny edge storage, then purge the pull zone.
// Runs in CI (.github/workflows/deploy.yml) and locally after `npm run build`:
//
//   BUNNY_STORAGE_ZONE=… BUNNY_STORAGE_KEY=… BUNNY_PULL_ID=… BUNNY_API_KEY=… npm run deploy
//
// Requires Node ≥ 23.6 (runs TypeScript directly).
import { createHash } from 'node:crypto';
import { createReadStream, openAsBlob } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { planUploads, type Checksums } from './deploy-plan.ts';

const DIST = 'dist';
const STORAGE_HOST = 'https://storage.bunnycdn.com';
const PARALLEL = 4;

interface StorageObject {
  ObjectName: string;
  IsDirectory: boolean;
  Checksum: string | null;
}

function env(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`missing environment variable ${name}`);
  return value;
}

const zone = env('BUNNY_STORAGE_ZONE');
const storageKey = env('BUNNY_STORAGE_KEY');
const pullId = env('BUNNY_PULL_ID');
const apiKey = env('BUNNY_API_KEY');

function sha256(file: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const hash = createHash('sha256');
    createReadStream(file)
      .on('data', (chunk) => hash.update(chunk))
      .on('end', () => resolve(hash.digest('hex').toUpperCase()))
      .on('error', reject);
  });
}

async function localChecksums(): Promise<Checksums> {
  const entries = await readdir(DIST, { recursive: true, withFileTypes: true });
  const files = entries.filter((e) => e.isFile()).map((e) => join(e.parentPath, e.name));
  const pairs = await Promise.all(
    files.map(async (f) => [relative(DIST, f).split(sep).join('/'), await sha256(f)] as const),
  );
  return new Map(pairs);
}

async function remoteChecksums(dir = ''): Promise<Map<string, string>> {
  const res = await fetch(`${STORAGE_HOST}/${zone}/${dir}`, { headers: { AccessKey: storageKey } });
  if (!res.ok) throw new Error(`listing /${dir} failed: ${res.status}`);
  const objects = (await res.json()) as StorageObject[];
  const found = new Map<string, string>();
  for (const o of objects) {
    const path = dir + o.ObjectName;
    if (o.IsDirectory) {
      for (const entry of await remoteChecksums(`${path}/`)) found.set(...entry);
    } else if (o.Checksum) {
      found.set(path, o.Checksum);
    }
  }
  return found;
}

async function upload(path: string, checksum: string): Promise<void> {
  const res = await fetch(`${STORAGE_HOST}/${zone}/${path}`, {
    method: 'PUT',
    // Bunny verifies the body against this and rejects a corrupted upload.
    headers: { AccessKey: storageKey, Checksum: checksum, 'Content-Type': 'application/octet-stream' },
    body: await openAsBlob(join(DIST, path)),
  });
  if (!res.ok) throw new Error(`upload ${path} failed: ${res.status} ${await res.text()}`);
  console.log(`  ${res.status}  ${path}`);
}

async function uploadAll(paths: string[], local: Checksums): Promise<void> {
  // index.html is last in the plan; hold it back until every asset is in.
  const entry = paths.at(-1) === 'index.html' ? paths.slice(-1) : [];
  const queue = paths.slice(0, paths.length - entry.length);
  const worker = async () => {
    for (let p = queue.shift(); p; p = queue.shift()) await upload(p, local.get(p)!);
  };
  await Promise.all(Array.from({ length: PARALLEL }, worker));
  for (const p of entry) await upload(p, local.get(p)!);
}

async function purge(): Promise<void> {
  // index.html keeps its path under a 30-day edge TTL, so nothing is live until the purge.
  const res = await fetch(`https://api.bunny.net/pullzone/${pullId}/purgeCache`, {
    method: 'POST',
    headers: { AccessKey: apiKey },
  });
  if (!res.ok) throw new Error(`purge failed: ${res.status}`);
  console.log(`purged pull zone ${pullId}`);
}

const [local, remote] = await Promise.all([localChecksums(), remoteChecksums()]);
const plan = planUploads(local, remote);
console.log(`${local.size} files in ${DIST}/, ${plan.length} new or changed`);
await uploadAll(plan, local);
if (plan.length > 0) await purge();
