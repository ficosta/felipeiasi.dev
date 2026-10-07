import { C, F, displayStyle, labelStyle } from '../shared/theme';
import { RACE, fmtInt, fmtPct } from './data';

export const BOARD_W = 920;

/** Results board at a given count progress p (0 = nothing counted, 1 = final). */
export const Board: React.FC<{ p: number }> = ({ p }) => {
  const done = p >= 0.999;
  return (
    <div style={{ width: BOARD_W, background: C.bg }}>
      {/* Header: race on the left, sections counted on the right, as in the app */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ ...labelStyle, fontSize: 24, color: done ? C.fg : C.dim }}>
            {done ? '2º turno definido' : 'Apurando'}
          </div>
          <div style={{ ...displayStyle, fontSize: 84, color: C.fg, marginTop: 12 }}>Presidente</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ ...labelStyle, fontSize: 24 }}>Seções apuradas</div>
          <div style={{ ...displayStyle, fontSize: 84, color: C.fg, marginTop: 12, fontVariantNumeric: 'tabular-nums' }}>
            {fmtPct(100 * p)}
          </div>
        </div>
      </div>
      <div style={{ position: 'relative', height: 6, background: C.line, marginTop: 22 }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${100 * p}%`, background: C.fg }} />
      </div>
      <div style={{ ...labelStyle, fontSize: 20, marginTop: 12, fontVariantNumeric: 'tabular-nums' }}>
        {fmtInt(RACE.sections * p)} de {fmtInt(RACE.sections)} seções
      </div>

      {RACE.top2.map((c, i) => (
        <div key={c.number} style={{ marginTop: i === 0 ? 30 : 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ ...displayStyle, fontSize: 64, color: C.fg }}>{c.name}</div>
              <div style={{ ...labelStyle, fontSize: 20, marginTop: 10 }}>
                {c.party} {c.number} · {fmtInt(c.votes * p)} votos
              </div>
            </div>
            <div style={{ ...displayStyle, fontSize: 116, color: C.fg, fontVariantNumeric: 'tabular-nums' }}>
              {fmtPct(c.pct * p)}
            </div>
          </div>
          <div style={{ position: 'relative', height: 18, marginTop: 12, borderBottom: `1px solid ${C.line}` }}>
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: `${c.pct * p}%`,
                background: i === 0 ? C.fg : C.dim,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export const Tally: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
    <div
      style={{
        background: C.tally,
        color: '#FFFFFF',
        fontFamily: F.mono,
        fontWeight: 500,
        fontSize: 26,
        letterSpacing: '0.1em',
        padding: '8px 16px 7px',
      }}
    >
      AO VIVO
    </div>
    <div style={{ ...labelStyle, fontSize: 24 }}>Eleições 2026 · 1º turno</div>
  </div>
);
