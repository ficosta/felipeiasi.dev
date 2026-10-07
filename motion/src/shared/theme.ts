import { continueRender, delayRender, staticFile } from 'remotion';

// Same tokens as the site (src/index.css). Tally red only ever means live/current.
export const C = {
  bg: '#0A0A0B',
  fg: '#ECEBE6',
  dim: '#8A8984',
  line: '#232325',
  panel: '#141416',
  tally: '#FF2D1F',
} as const;

// Same font files as the site, so the condensed display width (font-stretch) matches.
const FACES: Array<[string, string, string, string]> = [
  ['Archivo Variable', 'fonts/archivo-latin-wdth-normal.woff2', '100 900', '62% 125%'],
  ['Archivo Variable', 'fonts/archivo-latin-ext-wdth-normal.woff2', '100 900', '62% 125%'],
  ['JetBrains Mono', 'fonts/jetbrains-mono-latin-400-normal.woff2', '400', '100%'],
  ['JetBrains Mono', 'fonts/jetbrains-mono-latin-500-normal.woff2', '500', '100%'],
];

if (typeof document !== 'undefined') {
  const handle = delayRender('Loading site fonts');
  Promise.all(
    FACES.map(([family, file, weight, stretch]) => {
      const face = new FontFace(family, `url(${staticFile(file)}) format('woff2')`, { weight, stretch });
      document.fonts.add(face);
      return face.load();
    }),
  )
    .then(() => continueRender(handle))
    .catch((err) => {
      console.error('Font load failed', err);
      continueRender(handle);
    });
}

export const F = {
  sans: '"Archivo Variable", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
} as const;

/** Condensed display type, as `.display` on the site. */
export const displayStyle: React.CSSProperties = {
  fontFamily: F.sans,
  fontStretch: '64%',
  fontWeight: 800,
  textTransform: 'uppercase',
  lineHeight: 0.86,
};

/** Thumbnail format: 16:10, matches the multiviewer tiles; 6 s seamless loop. */
export const THUMB = { width: 1600, height: 1000, fps: 30, durationInFrames: 180 } as const;

/** Mono technical label used across the site. */
export const labelStyle: React.CSSProperties = {
  fontFamily: F.mono,
  fontSize: 22,
  fontWeight: 500,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: C.dim,
};
