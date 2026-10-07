import { AbsoluteFill, Img, staticFile } from 'remotion';
import { C, displayStyle } from '../shared/theme';
import { mono } from './parts';

/*
 * Case-page figures for OGraf, rendered as stills of the `ograf` composition with
 * --props='{"fig":"<id>"}'. Real ograf.dev captures, framed flat on the On Air background.
 */

const src = (file: string) => staticFile(`ograf/${file}`);

/** A capture in a square 1px frame with a mono caption bar above it. */
const Shot: React.FC<{ file: string; w: number; h: number; label: string; note?: string; x: number; y: number }> = ({
  file,
  w,
  h,
  label,
  note,
  x,
  y,
}) => (
  <div style={{ position: 'absolute', left: x, top: y, width: w }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 14 }}>
      <span style={mono(20, C.fg)}>{label}</span>
      {note ? <span style={mono(18)}>{note}</span> : null}
    </div>
    <div style={{ width: w, height: h, outline: `1px solid ${C.line}`, overflow: 'hidden', background: C.panel }}>
      <Img src={src(file)} style={{ width: w, height: h, objectFit: 'cover', objectPosition: 'top left', display: 'block' }} />
    </div>
  </div>
);

const Footer: React.FC<{ left: string; right?: string }> = ({ left, right = 'ograf.dev' }) => (
  <div
    style={{
      position: 'absolute',
      left: 80,
      right: 80,
      bottom: 44,
      display: 'flex',
      justifyContent: 'space-between',
      borderTop: `1px solid ${C.line}`,
      paddingTop: 16,
    }}
  >
    <span style={mono(18)}>{left}</span>
    <span style={mono(18)}>{right}</span>
  </div>
);

const Hero: React.FC = () => (
  <>
    <Shot file="hero.png" w={1280} h={800} x={160} y={52} label="ograf.dev" note="Home" />
    <Footer left="The community guide to OGraf, the EBU's open graphics format" />
  </>
);

const Tutorial: React.FC = () => (
  <>
    <div style={{ position: 'absolute', left: 80, top: 60, ...displayStyle, fontSize: 64, color: C.fg }}>
      Build your first OGraf template
    </div>
    <Shot file="crop-manifest.png" w={700} h={557} x={80} y={180} label="01 manifest.json" note="JSON Schema" />
    <Shot file="clean-widget.png" w={700} h={498} x={820} y={180} label="02 Playing in the tutorial" note="Play · Update · Stop" />
    <Footer left="One package: a manifest, a Web Component, a stylesheet" />
  </>
);

const DEMOS: Array<[string, string]> = [
  ['clean-election-bars.png', 'Election bars'],
  ['clean-ticker.png', 'News ticker'],
  ['clean-countdown.png', 'Countdown'],
  ['clean-quote.png', 'Full page quote'],
];

const Tutorials: React.FC = () => {
  const w = 700;
  const h = Math.round((w * 716) / 1408);
  return (
    <>
      {DEMOS.map(([file, label], i) => (
        <Shot
          key={file}
          file={file}
          w={w}
          h={h}
          x={80 + (i % 2) * (w + 40)}
          y={52 + Math.floor(i / 2) * (h + 70)}
          label={label}
          note="Live preview"
        />
      ))}
      <Footer left="Four of the 11 production tutorials, captured from ograf.dev" />
    </>
  );
};

const Compare: React.FC = () => (
  <>
    <div style={{ position: 'absolute', left: 80, top: 96, ...displayStyle, fontSize: 120, color: C.fg }}>
      Where OGraf fits in
    </div>
    <Shot file="crop-compare.png" w={1440} h={551} x={80} y={300} label="Comparison" note="One axis: cross-renderer portability" />
    <Footer left="An open layer next to Vizrt, Chyron, Ross, Avid, Flowics and Singular" />
  </>
);

const STATS: Array<[string, string]> = [
  ['v1', 'Stable since Sep 2025'],
  ['10+', 'Tools and renderers'],
  ['11', 'Production tutorials'],
  ['EBU', 'Maintains the spec'],
];

const Adopters: React.FC = () => (
  <>
    <Shot file="crop-adopters.png" w={1440} h={432} x={80} y={70} label="Vendors and adopters" note="As listed on ograf.ebu.io" />
    <div style={{ position: 'absolute', left: 80, right: 80, top: 610, display: 'flex', borderTop: `1px solid ${C.line}` }}>
      {STATS.map(([big, small], i) => (
        <div key={big} style={{ flex: 1, paddingTop: 28, paddingLeft: i === 0 ? 0 : 28, borderLeft: i === 0 ? 'none' : `1px solid ${C.line}` }}>
          <div style={{ ...displayStyle, fontSize: 150, color: C.fg }}>{big}</div>
          <div style={{ ...mono(20), marginTop: 18 }}>{small}</div>
        </div>
      ))}
    </div>
    <Footer left="Adobe, BBC, NRK, Deutsche Welle and CBC among the supporters" />
  </>
);

const FIGS: Record<string, React.FC> = {
  hero: Hero,
  tutorial: Tutorial,
  tutorials: Tutorials,
  compare: Compare,
  adopters: Adopters,
};

export const OgrafFigure: React.FC<{ fig: string }> = ({ fig }) => {
  const Fig = FIGS[fig] ?? Hero;
  return (
    <AbsoluteFill style={{ background: C.bg, color: C.fg }}>
      <Fig />
    </AbsoluteFill>
  );
};
