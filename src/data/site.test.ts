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

  it('marks exactly one current role, listed first', () => {
    const current = data.experience.filter((e) => e.current);
    expect(current).toHaveLength(1);
    expect(data.experience[0].current).toBe(true);
  });

  it('has the positioning fields the hero needs', () => {
    expect(data.profile.headline).toBeTruthy();
    expect(data.profile.tagline).toBeTruthy();
    expect(data.profile.years).toBe('18+');
  });
});
