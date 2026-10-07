import { Img, staticFile } from 'remotion';
import { C, F } from '../shared/theme';

const BEZEL = 12;

/** Plain device frame: square corners, 1px rule, panel-coloured bezel. */
export const Phone: React.FC<{ src: string; width: number; x: number; y: number; style?: React.CSSProperties }> = ({
  src,
  width,
  x,
  y,
  style,
}) => {
  const inner = width - BEZEL * 2;
  const innerH = Math.round((inner * 1688) / 780);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        height: innerH + BEZEL * 2,
        background: C.panel,
        border: `1px solid #3A3A3D`,
        boxSizing: 'border-box',
        padding: BEZEL - 1,
        ...style,
      }}
    >
      <Img src={staticFile(`apuracao/${src}`)} style={{ width: inner, height: innerH, display: 'block' }} />
    </div>
  );
};

/** Browser window: 1px rule, mono URL bar, no chrome ornaments. */
export const Browser: React.FC<{ src: string; width: number; x: number; y: number; url?: string; cropH?: number }> = ({
  src,
  width,
  x,
  y,
  url = 'apuracao.setup.news',
  cropH = 1800,
}) => {
  // cropH: visible height in source pixels (2880 wide captures), cropped from the top.
  const imgH = Math.round((width * cropH) / 2880);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width, border: '1px solid #3A3A3D', background: C.panel }}>
      <div
        style={{
          height: 34,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: 10,
          borderBottom: `1px solid ${C.line}`,
          fontFamily: F.mono,
          fontSize: 14,
          letterSpacing: '0.06em',
          color: C.dim,
          textTransform: 'uppercase',
        }}
      >
        <span style={{ width: 9, height: 9, border: `1px solid ${C.dim}` }} />
        {url}
      </div>
      <div style={{ width, height: imgH, overflow: 'hidden' }}>
        <Img src={staticFile(`apuracao/${src}`)} style={{ width, display: 'block' }} />
      </div>
    </div>
  );
};

/** Close-up: shows the region (sx, sy, sw, sh) of a capture inside a 1px-ruled box `width` wide. */
export const Crop: React.FC<{
  src: string;
  natW: number;
  sx: number;
  sy: number;
  sw: number;
  sh: number;
  x: number;
  y: number;
  width: number;
}> = ({ src, natW, sx, sy, sw, sh, x, y, width }) => {
  const k = width / sw;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        height: Math.round(sh * k),
        overflow: 'hidden',
        outline: '1px solid #3A3A3D',
      }}
    >
      <Img
        src={staticFile(`apuracao/${src}`)}
        style={{ position: 'absolute', width: natW * k, left: -sx * k, top: -sy * k, maxWidth: 'none' }}
      />
    </div>
  );
};
