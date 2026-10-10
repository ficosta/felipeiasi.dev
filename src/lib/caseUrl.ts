// An open case file lives in the query string (?case=<id>), so it can be
// linked, shared and closed with the browser's back button. A query string
// works on any static host without SPA fallback rules.
const PARAM = 'case';

export function caseIdFromSearch(search: string): string | null {
  return new URLSearchParams(search).get(PARAM) || null;
}

export function searchForCase(search: string, id: string | null): string {
  const params = new URLSearchParams(search);
  if (id) params.set(PARAM, id);
  else params.delete(PARAM);
  const query = params.toString();
  return query ? `?${query}` : '';
}
