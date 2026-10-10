/** Relative path → SHA-256 hex. */
export type Checksums = ReadonlyMap<string, string>;

const ENTRY = 'index.html';

/**
 * Files to upload: new or changed ones only, since dist/ carries a few hundred
 * MB of project media that rarely changes. index.html goes last so the page
 * never points at assets that are not in storage yet.
 */
export function planUploads(local: Checksums, remote: Checksums): string[] {
  const changed = [...local]
    .filter(([path, sum]) => remote.get(path)?.toUpperCase() !== sum.toUpperCase())
    .map(([path]) => path);
  return [...changed.filter((p) => p !== ENTRY), ...changed.filter((p) => p === ENTRY)];
}
