import { AbsoluteFill, Img, staticFile } from 'remotion';
import { C, labelStyle } from '../shared/theme';

type Shot = { src: string; w: number; h: number; light?: boolean };
type FigSpec = { section: string; path: string; shots: Shot[] };

// Real captures of storyobjectmodel.dev (dark theme unless a shot is marked light), framed on the site's own grammar.
export const FIGS: Record<string, FigSpec> = {
  hero: { section: 'HOME', path: 'storyobjectmodel.dev', shots: [{ src: 'som/crop-hero-light.png', w: 2880, h: 1800 }] },
  idea: { section: 'THE IDEA', path: 'storyobjectmodel.dev/#idea', shots: [{ src: 'som/crop-idea.png', w: 2247, h: 1404 }] },
  envelope: { section: 'THE ENVELOPE', path: 'storyobjectmodel.dev/#envelope', shots: [{ src: 'som/crop-envelope.png', w: 2247, h: 1080 }] },
  rulebook: { section: 'THE RULEBOOK', path: 'storyobjectmodel.dev/#rulebook', shots: [{ src: 'som/crop-rulebook.png', w: 2247, h: 1210 }] },
  who: {
    section: 'CREDITS',
    path: 'storyobjectmodel.dev/#who',
    shots: [{ src: 'som/crop-champions-logos.png', w: 1267, h: 202, light: true }, { src: 'som/crop-roster.png', w: 2247, h: 396 }],
  },
};

const PAD = 64;
const HEAD = 104;

const AREA = { w: 1600 - PAD * 2, h: 1000 - HEAD - 40 } as const;
const GAP = 28;

/** Scale every shot by one factor so the stack fits the area. Light shots get a white mat. */
const layout = (shots: Shot[]): number => {
  const mat = (s: Shot) => (s.light ? 56 : 0);
  const byW = Math.min(...shots.map((s) => (AREA.w - mat(s) * 2) / s.w));
  const fixed = shots.reduce((a, s) => a + mat(s), 0) + GAP * (shots.length - 1);
  const byH = (AREA.h - fixed) / shots.reduce((a, s) => a + s.h, 0);
  return Math.min(byW, byH);
};

export const SomFigure: React.FC<{ fig: string }> = ({ fig }) => {
  const spec = FIGS[fig] ?? FIGS.hero;
  const k = layout(spec.shots);
  return (
    <AbsoluteFill style={{ background: C.bg, color: C.fg }}>
      <div style={{ position: 'absolute', left: PAD, right: PAD, top: 40, display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ ...labelStyle, fontSize: 20, color: C.fg }}>
          <span style={{ color: C.dim }}>SOM 1.0 · </span>
          {spec.section}
        </span>
        <span style={{ ...labelStyle, fontSize: 20 }}>{spec.path}</span>
      </div>
      <div style={{ position: 'absolute', left: PAD, right: PAD, top: 80, height: 1, background: C.line }} />
      <div
        style={{
          position: 'absolute',
          left: PAD,
          right: PAD,
          top: HEAD,
          height: AREA.h,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: GAP,
        }}
      >
        {spec.shots.map((s) => (
          <div
            key={s.src}
            style={{
              border: `1px solid ${C.line}`,
              background: s.light ? '#FFFFFF' : C.panel,
              padding: s.light ? '28px 56px' : 0,
            }}
          >
            <Img src={staticFile(s.src)} style={{ display: 'block', width: s.w * k, height: s.h * k }} />
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
