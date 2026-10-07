import { Img, interpolate, staticFile } from 'remotion';
import { C, F, displayStyle } from '../shared/theme';

/** OGraf brand blue, taken from the official logo. Used only on the package's own graphic. */
export const OGRAF_BLUE = '#2352C3';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/** Map frame into 0..1 over [start, end] with an ease-out cubic. */
export const ease = (frame: number, start: number, end: number): number => {
  const t = interpolate(frame, [start, end], [0, 1], clamp);
  return 1 - Math.pow(1 - t, 3);
};

/** 0..1 "on air" amount: animates in over [inStart, inStart+dur], out over [outStart, outStart+dur]. */
export const onAir = (frame: number, inStart: number, outStart: number, dur = 14): number =>
  frame < outStart ? ease(frame, inStart, inStart + dur) : 1 - ease(frame, outStart, outStart + dur);

type LowerThirdProps = {
  /** 0 = off, 1 = fully on. */
  p: number;
  /** Width of the graphic in px; everything scales from it. */
  width: number;
  name?: string;
  title?: string;
};

/**
 * The lower third from the ograf.dev "first template" tutorial (same name and title),
 * redrawn square and flat: blue accent bar, light plate, condensed name, mono title.
 */
export const LowerThird: React.FC<LowerThirdProps> = ({
  p,
  width,
  name = 'Jane Smith',
  title = 'Senior Graphics Engineer',
}) => {
  const u = width / 100;
  const accent = interpolate(p, [0, 0.35], [0, 1], clamp);
  const plate = interpolate(p, [0.2, 0.8], [0, 1], clamp);
  const text = interpolate(p, [0.55, 1], [0, 1], clamp);
  const height = 22 * u;
  return (
    <div style={{ position: 'relative', width, height }}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 2.4 * u,
          height,
          background: OGRAF_BLUE,
          transform: `scaleY(${accent})`,
          transformOrigin: 'bottom',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 2.4 * u,
          top: 0,
          right: 0,
          height,
          background: C.fg,
          clipPath: `inset(0 ${(1 - plate) * 100}% 0 0)`,
        }}
      >
        <div style={{ position: 'absolute', left: 5 * u, top: 3.6 * u, opacity: text, transform: `translateY(${(1 - text) * 2 * u}px)` }}>
          <div style={{ ...displayStyle, fontSize: 10.5 * u, color: C.bg, whiteSpace: 'nowrap' }}>{name}</div>
          <div
            style={{
              fontFamily: F.mono,
              fontWeight: 500,
              fontSize: 3.4 * u,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: OGRAF_BLUE,
              marginTop: 1.8 * u,
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </div>
        </div>
      </div>
    </div>
  );
};

/** The official OGraf logo on a light plate (its blue is too dark to sit straight on #0A0A0B). */
export const LogoPlate: React.FC<{ width: number; height: number; logoWidth: number }> = ({ width, height, logoWidth }) => (
  <div style={{ width, height, background: C.fg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Img src={staticFile('ograf/ograf-logo-colour.svg')} style={{ width: logoWidth }} />
  </div>
);

export const mono = (size: number, color: string = C.dim): React.CSSProperties => ({
  fontFamily: F.mono,
  fontSize: size,
  fontWeight: 500,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color,
  whiteSpace: 'nowrap',
});
