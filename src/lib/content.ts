import type { SiteData } from '@/types/site';

export async function loadSiteData(): Promise<SiteData> {
  const data = await import('@/data/site.json');
  return (data.default || data) as SiteData;
}

export type { SiteData };
