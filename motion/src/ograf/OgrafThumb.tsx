import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { C, displayStyle } from '../shared/theme';
import { LogoPlate, LowerThird, ease, mono } from './parts';
import { OgrafFigure } from './Figures';

/*
 * OGraf thumbnail, 180 frames, seamless loop. Frame 0 (= frame 179) is the poster:
 * the package's lower third on air in the source panel and on four renderers.
 *   24-56   everything takes out, monitor by monitor (stopAction)
 *   58-80   the package plays again in the source panel (playAction)
 *   86-150  the same graphic travels to each renderer and goes to air there
 *   150-179 hold, identical to frame 0
 */

const PAD = 80;
const LEFT_W = 480;
const PKG = { x: PAD, y: 280, w: LEFT_W, h: 380 };
const PKG_L3 = { x: PKG.x + 28, y: PKG.y + 140, w: LEFT_W - 56 };
const MON = { w: 444, h: 250, umd: 46 };
const COLS = [612, 1076];
const ROWS = [80, 80 + MON.h + MON.umd + 24];
const MON_L3 = { dx: 26, w: 230 };
const monL3Y = MON.h - 34 - MON_L3.w * 0.22;

const RENDERERS = ['CasparCG', 'SPX', 'ograf-server', 'Loopic'];

const PKG_OUT = 40;
const PKG_IN = 58;
const SEND = (i: number) => 86 + i * 12;
const TRAVEL = 11;

/** On air from the previous loop until outStart, back on air from inStart. */
const loopAir = (frame: number, outStart: number, inStart: number, outDur: number, inDur: number): number =>
  frame < inStart ? 1 - ease(frame, outStart, outStart + outDur) : ease(frame, inStart, inStart + inDur);

const Monitor: React.FC<{ i: number; frame: number }> = ({ i, frame }) => {
  const x = COLS[i % 2];
  const y = ROWS[Math.floor(i / 2)];
  const air = loopAir(frame, 24 + i * 6, SEND(i) + TRAVEL - 1, 12, 16);
  const live = air > 0.5;
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: MON.w }}>
      <div style={{ position: 'relative', width: MON.w, height: MON.h, background: C.panel, outline: `1px solid ${C.line}`, overflow: 'hidden' }}>
        {/* title-safe frame, as on a monitor overlay */}
        <div style={{ position: 'absolute', inset: '8% 6%', border: `1px solid ${C.line}` }} />
        <div style={{ position: 'absolute', right: 14, top: 2, ...mono(15, '#55554F') }}>1920×1080</div>
        <div style={{ position: 'absolute', left: MON_L3.dx, top: monL3Y }}>
          <LowerThird p={air} width={MON_L3.w} />
        </div>
      </div>
      <div
        style={{
          height: MON.umd,
          borderTop: `1px solid ${C.line}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: 2,
        }}
      >
        <span style={mono(22, live ? C.fg : C.dim)}>{RENDERERS[i]}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={mono(16, live ? C.tally : '#55554F')}>{live ? 'On air' : 'Ready'}</span>
          <span style={{ width: 16, height: 16, background: live ? C.tally : 'transparent', border: `2px solid ${live ? C.tally : C.line}` }} />
        </span>
      </div>
    </div>
  );
};

/** Outline of the graphic flying from the package panel to monitor i. */
const Ghost: React.FC<{ i: number; frame: number }> = ({ i, frame }) => {
  const s = SEND(i);
  if (frame < s || frame > s + TRAVEL) return null;
  const t = ease(frame, s, s + TRAVEL);
  const tx = COLS[i % 2] + MON_L3.dx;
  const ty = ROWS[Math.floor(i / 2)] + monL3Y;
  const x = interpolate(t, [0, 1], [PKG_L3.x, tx]);
  const y = interpolate(t, [0, 1], [PKG_L3.y, ty]);
  const w = interpolate(t, [0, 1], [PKG_L3.w, MON_L3.w]);
  const opacity = interpolate(frame, [s, s + 2, s + TRAVEL - 2, s + TRAVEL], [0, 1, 1, 0]);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: w * 0.22, border: `3px solid ${C.fg}`, opacity }} />
  );
};

const PackagePanel: React.FC<{ frame: number }> = ({ frame }) => {
  const air = loopAir(frame, PKG_OUT, PKG_IN, 12, 22);
  const stopped = frame >= PKG_OUT && frame < PKG_IN;
  return (
    <div style={{ position: 'absolute', left: PKG.x, top: PKG.y, width: PKG.w, height: PKG.h, background: C.panel, outline: `1px solid ${C.line}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '22px 28px', borderBottom: `1px solid ${C.line}` }}>
        <span style={mono(22, C.fg)}>OGraf package</span>
        <span style={{ ...mono(20), textTransform: 'none', letterSpacing: 0 }}>{stopped ? 'stopAction()' : 'playAction()'}</span>
      </div>
      <div style={{ position: 'absolute', left: PKG_L3.x - PKG.x, top: PKG_L3.y - PKG.y }}>
        <LowerThird p={air} width={PKG_L3.w} />
      </div>
      <div style={{ position: 'absolute', left: 28, bottom: 24, ...mono(18) }}>manifest.json · graphic.mjs</div>
    </div>
  );
};

const Thumb: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.bg, color: C.fg }}>
      <div style={{ position: 'absolute', left: PAD, top: 80 }}>
        <LogoPlate width={LEFT_W} height={176} logoWidth={380} />
      </div>
      <PackagePanel frame={frame} />
      {RENDERERS.map((_, i) => (
        <Monitor key={i} i={i} frame={frame} />
      ))}
      {RENDERERS.map((_, i) => (
        <Ghost key={i} i={i} frame={frame} />
      ))}
      <div style={{ position: 'absolute', left: PAD, right: PAD, bottom: 84, ...displayStyle, fontSize: 126, color: C.fg, whiteSpace: 'nowrap' }}>
        One package. <span style={{ color: C.dim }}>Any renderer.</span>
      </div>
    </AbsoluteFill>
  );
};

export const OgrafThumb: React.FC<{ fig?: string }> = ({ fig }) => (fig ? <OgrafFigure fig={fig} /> : <Thumb />);
