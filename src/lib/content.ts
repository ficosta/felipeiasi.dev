export type SiteData = typeof import('@/data/site.json');
export async function loadSiteData() {
  const data = await import('@/data/site.json');
  return data as SiteData;
}
