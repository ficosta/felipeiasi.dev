// Real first-round presidential numbers, as served by the app's CDN:
// https://api.apuracao.setup.news/resumo/br-presidente.json (TSE final, 05/10/2026 12:52:05).
export const RACE = {
  top2: [
    { name: 'FLAVIO BOLSONARO', party: 'PL', number: '22', pct: 47.03, votes: 56104503 },
    { name: 'LULA', party: 'PT', number: '13', pct: 45.16, votes: 53879538 },
  ],
  sections: 499248,
} as const;

export const fmtPct = (v: number): string => `${v.toFixed(2).replace('.', ',')}%`;

export const fmtInt = (v: number): string =>
  Math.round(v)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
