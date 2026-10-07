import { interpolate } from 'remotion';
import { C, labelStyle } from '../shared/theme';

const NODES = ['TSE', 'Espelho', 'CDN', 'App · TV · Mapas'];

/** Bottom strip: the data path, with a packet travelling along it (period divides 180 for a clean loop). */
export const Pipeline: React.FC<{ frame: number; width: number }> = ({ frame, width }) => {
  const period = 60;
  const t = (frame % period) / period;
  const x = interpolate(t, [0, 0.85, 1], [0, width, width], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fade = interpolate(t, [0, 0.06, 0.78, 0.85], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <div style={{ position: 'relative', width }}>
      <div style={{ position: 'relative', height: 1, background: C.line }}>
        {NODES.map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${(i / (NODES.length - 1)) * 100}%`,
              top: -5,
              width: 11,
              height: 11,
              marginLeft: i === NODES.length - 1 ? -11 : i === 0 ? 0 : -5,
              background: C.bg,
              border: `1px solid ${C.dim}`,
              boxSizing: 'border-box',
            }}
          />
        ))}
        <div style={{ position: 'absolute', left: x - 30, top: -1, width: 30, height: 3, background: C.fg, opacity: fade }} />
      </div>
      <div style={{ position: 'relative', height: 30, marginTop: 16 }}>
        {NODES.map((n, i) => {
          const last = i === NODES.length - 1;
          const pos = (i / (NODES.length - 1)) * 100;
          return (
            <div
              key={n}
              style={{
                ...labelStyle,
                fontSize: 22,
                position: 'absolute',
                whiteSpace: 'nowrap',
                left: last ? undefined : `${pos}%`,
                right: last ? 0 : undefined,
                transform: i === 0 || last ? undefined : 'translateX(-50%)',
              }}
            >
              {n}
            </div>
          );
        })}
      </div>
    </div>
  );
};
