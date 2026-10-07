import { describe, expect, it } from 'vitest';
import site from './site.json';
import { layoutFlow } from '@/lib/flow';
import type { SiteData } from '@/types/site';

const data = site as SiteData;

describe('site.json', () => {
  it('has exactly one featured project', () => {
    expect(data.projects.filter((p) => p.featured)).toHaveLength(1);
  });

  it('gives every project a flow whose edges reference existing nodes', () => {
    for (const p of data.projects) {
      expect(p.flow, p.id).toBeDefined();
      expect(() => layoutFlow(p.flow!), p.id).not.toThrow();
    }
  });

  it('lists current roles before past ones', () => {
    const firstPast = data.experience.findIndex((e) => !e.current);
    expect(firstPast).toBeGreaterThan(0);
    expect(data.experience.slice(firstPast).some((e) => e.current)).toBe(false);
  });

  it('only labels real certifications as certifications', () => {
    const certs = data.certifications.filter((c) => c.kind === 'certification').map((c) => c.name);
    expect(certs.sort()).toEqual(['LINUX LPI 2', 'Viz Artist Designer']);
    expect(data.certifications.every((c) => c.kind)).toBe(true);
  });

  it('never uses an em dash (house style: commas, colons or an en dash for ranges)', () => {
    expect(JSON.stringify(site)).not.toContain('\u2014');
  });

  it('has the positioning fields the hero needs', () => {
    expect(data.profile.headline).toBeTruthy();
    expect(data.profile.tagline).toBeTruthy();
    expect(data.profile.years).toBe('18+');
  });
});
