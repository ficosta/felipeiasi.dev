import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { C, F, displayStyle, labelStyle } from '../shared/theme';
import { BEAT, LOOP, pop, ramp, travel, window } from './timeline';

// Geometry (1600 x 1000 canvas).
const BUS = { x0: 80, x1: 1520, top: 612, h: 64 } as const;
const BUS_MID = BUS.top + BUS.h / 2;
const NODE = { w: 300, h: 112, topY: 452, bottomY: 724 } as const;

type Node = { id: string; label: string; family: string; x: number; row: 'top' | 'bottom' };

// Tools on the bus, each with the message family it publishes (names from storyobjectmodel.dev).
export const NODES: Node[] = [
  { id: 'ncs', label: 'NCS', family: 'story.context', x: 230, row: 'top' },
  { id: 'planning', label: 'PLANNING', family: 'story.context', x: 458, row: 'bottom' },
  { id: 'mam', label: 'MAM', family: 'delivery.media_available', x: 686, row: 'top' },
  { id: 'standards', label: 'STANDARDS', family: 'system.audit', x: 914, row: 'bottom' },
  { id: 'graphics', label: 'GRAPHICS', family: 'skill.warning.raised', x: 1142, row: 'top' },
  { id: 'playout', label: 'PLAYOUT', family: 'telling.started', x: 1370, row: 'bottom' },
];
const X = Object.fromEntries(NODES.map((n) => [n.id, n.x])) as Record<string, number>;

// Background traffic: evenly spaced, period = loop length, so frame 179 flows into frame 0.
const STREAM = ['story.context', 'link.committed', 'story.context', 'delivery.media_available'];
const pillWidth = (text: string, px: number): number => Math.round(text.length * px * 0.6 + 36);

const StreamPill: React.FC<{ frame: number; index: number }> = ({ frame, index }) => {
  const text = STREAM[index];
  const w = pillWidth(text, 20);
  const span = BUS.x1 - BUS.x0 + w;
  const phase = (((frame / LOOP + index / STREAM.length) % 1) + 1) % 1;
  const x = BUS.x0 - w + phase * span;
  const edge = Math.min(ramp(x, BUS.x0 - w * 0.4, BUS.x0 + 60), 1 - ramp(x, BUS.x1 - w - 60, BUS.x1 - w * 0.6));
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: BUS_MID - 19,
        height: 38,
        width: w,
        border: `1.5px solid ${C.dim}`,
        background: C.bg,
        color: C.dim,
        fontFamily: F.mono,
        fontSize: 20,
        lineHeight: '35px',
        textAlign: 'center',
        opacity: edge * 0.9,
      }}
    >
      {text}
    </div>
  );
};

/** A message that leaves one tool and arrives at another. */
const EventPill: React.FC<{ frame: number; text: string; from: number; to: number; out: number; arrive: number }> = ({
  frame,
  text,
  from,
  to,
  out,
  arrive,
}) => {
  const w = pillWidth(text, 22);
  const x = travel(frame, out, arrive, from, to) - w / 2;
  const scale = interpolate(pop(frame, out), [0, 1], [0.4, 1]);
  const opacity = window(frame, out, arrive + 4, 4);
  if (opacity <= 0) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: Math.max(BUS.x0, Math.min(BUS.x1 - w, x)),
        top: BUS_MID - 23,
        height: 46,
        width: w,
        background: C.fg,
        color: C.bg,
        fontFamily: F.mono,
        fontWeight: 500,
        fontSize: 22,
        lineHeight: '46px',
        textAlign: 'center',
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {text}
    </div>
  );
};

type NodeState = { active: number; hold: number; air: number };

const ToolNode: React.FC<{ node: Node; state: NodeState }> = ({ node, state }) => {
  const top = node.row === 'top' ? NODE.topY : NODE.bottomY;
  const stubTop = node.row === 'top' ? top + NODE.h : BUS.top + BUS.h;
  const stubBottom = node.row === 'top' ? BUS.top : top;
  const lit = Math.max(state.active, state.hold, state.air);
  const border = state.air > 0.5 ? C.tally : lit > 0.5 ? C.fg : C.dim;
  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: node.x - 1.5 - lit,
          width: 3 + lit * 2,
          top: stubTop,
          height: stubBottom - stubTop,
          background: lit > 0.5 ? (state.air > 0.5 ? C.tally : C.fg) : C.dim,
        }}
      />
      {/* The gate on playout's tap: closed while held. */}
      {state.hold > 0 ? (
        <div
          style={{
            position: 'absolute',
            left: node.x - 44,
            width: 88,
            top: (stubTop + stubBottom) / 2 - 4,
            height: 8,
            background: C.fg,
            transform: `scaleX(${state.hold})`,
          }}
        />
      ) : null}
      <div
        style={{
          position: 'absolute',
          left: node.x - NODE.w / 2,
          top,
          width: NODE.w,
          height: NODE.h,
          background: C.panel,
          border: `${2 + lit}px solid ${border}`,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: 22,
        }}
      >
        <div style={{ ...displayStyle, fontSize: 58, color: C.fg }}>{node.label}</div>
        <div style={{ fontFamily: F.mono, fontSize: 17, color: C.dim, marginTop: 10, whiteSpace: 'nowrap' }}>
          {node.family}
        </div>
      </div>
    </>
  );
};

/** Status tag under playout: HOLD (inverted, not red) then ON AIR (tally red, it is live). */
const PlayoutTag: React.FC<{ frame: number }> = ({ frame }) => {
  const hold = window(frame, BEAT.warnIn, BEAT.clearIn + 2, 3) * pop(frame, BEAT.warnIn);
  const air = window(frame, BEAT.clearIn, BEAT.airEnd, 4) * pop(frame, BEAT.clearIn);
  const x = X.playout + NODE.w / 2;
  const base: React.CSSProperties = {
    position: 'absolute',
    right: 1600 - x,
    top: NODE.bottomY + NODE.h + 12,
    height: 52,
    padding: '0 18px',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    ...displayStyle,
    fontSize: 44,
    lineHeight: 1,
  };
  return (
    <>
      {hold > 0.01 ? (
        <div style={{ ...base, background: C.fg, color: C.bg, opacity: hold, transform: `translateY(${(1 - hold) * 10}px)` }}>
          HOLD
          <span style={{ fontFamily: F.mono, fontSize: 18, fontWeight: 500, letterSpacing: '0.06em' }}>
            ANY HOLD MEANS HELD
          </span>
        </div>
      ) : null}
      {air > 0.01 ? (
        <div style={{ ...base, background: C.tally, color: C.fg, opacity: air, transform: `translateY(${(1 - air) * 10}px)` }}>
          <span style={{ width: 14, height: 14, background: C.fg, display: 'inline-block' }} />
          ON AIR
        </div>
      ) : null}
    </>
  );
};

const nodeState = (id: string, f: number): NodeState => {
  const flash = (at: number) => window(f, at - 2, at + 14, 4);
  switch (id) {
    case 'mam':
      return { active: flash(BEAT.warnOut), hold: 0, air: 0 };
    case 'standards':
      return { active: flash(BEAT.clearOut), hold: 0, air: 0 };
    case 'playout':
      return {
        active: 0,
        hold: window(f, BEAT.warnIn, BEAT.clearIn, 3),
        air: window(f, BEAT.clearIn + 2, BEAT.airEnd, 4),
      };
    default:
      return { active: 0, hold: 0, air: 0 };
  }
};

export const BusThumb: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.bg, color: C.fg, overflow: 'hidden' }}>
      {/* Header strip */}
      <div style={{ position: 'absolute', left: 80, right: 80, top: 56, display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ ...labelStyle, fontSize: 22 }}>SOM 1.0 · OPEN STANDARD · IBC 2026</span>
        <span style={{ ...labelStyle, fontSize: 22 }}>STORYOBJECTMODEL.DEV</span>
      </div>
      <div style={{ position: 'absolute', left: 80, right: 80, top: 100, height: 1, background: C.line }} />

      {/* Title */}
      <div style={{ position: 'absolute', left: 72, top: 140, ...displayStyle, fontSize: 282, letterSpacing: '-0.01em' }}>
        SOM
      </div>
      <div style={{ position: 'absolute', left: 600, top: 150 }}>
        <div style={{ ...displayStyle, fontSize: 104, color: C.fg }}>STORY OBJECT MODEL</div>
        <div style={{ ...displayStyle, fontSize: 64, color: C.dim, marginTop: 26, lineHeight: 0.95 }}>
          ONE BUS FOR STORY CONTEXT.
          <br />
          EVERY TOOL ON IT.
        </div>
      </div>

      {/* The bus */}
      <div style={{ position: 'absolute', left: BUS.x1 - 330, top: BUS.top - 34, ...labelStyle, fontSize: 18, color: C.dim }}>
        STORY BUS · SOM.*
      </div>
      {NODES.map((n) => (
        <ToolNode key={n.id} node={n} state={nodeState(n.id, frame)} />
      ))}
      <div
        style={{
          position: 'absolute',
          left: BUS.x0,
          top: BUS.top,
          width: BUS.x1 - BUS.x0,
          height: BUS.h,
          border: `3px solid ${C.fg}`,
          boxSizing: 'border-box',
          background: C.bg,
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', left: -BUS.x0, top: -BUS.top, width: 1600, height: 1000 }}>
          {STREAM.map((_, i) => (
            <StreamPill key={i} frame={frame} index={i} />
          ))}
        </div>
      </div>
      <EventPill frame={frame} text="skill.warning.raised" from={X.mam} to={X.playout} out={BEAT.warnOut} arrive={BEAT.warnIn} />
      <EventPill frame={frame} text="system.audit · CLEARED" from={X.standards} to={X.playout} out={BEAT.clearOut} arrive={BEAT.clearIn} />
      <PlayoutTag frame={frame} />

      {/* Footer */}
      <div style={{ position: 'absolute', left: 80, right: 80, top: 924, height: 1, background: C.line }} />
      <div style={{ position: 'absolute', left: 80, right: 80, top: 944, display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ ...labelStyle, fontSize: 20 }}>TOOLS TALK TO THE STORY, NOT TO EACH OTHER</span>
        <span style={{ ...labelStyle, fontSize: 20 }}>7 MESSAGE FAMILIES · 14 + 17 ORGANISATIONS</span>
      </div>
    </AbsoluteFill>
  );
};
