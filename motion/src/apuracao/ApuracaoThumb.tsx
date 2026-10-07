import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { C, displayStyle } from '../shared/theme';
import { BOARD_W, Board, Tally } from './Board';
import { Figure, type FigureId } from './Figures';
import { Phone } from './Frames';
import { Pipeline } from './Pipeline';

const PAD = 72;
const BOARD_Y = 318;

// Timeline (180 frames, seamless): zero board, count 14-104, hold, wipe back to zero 150-172.
const COUNT_IN = 14;
const COUNT_OUT = 104;
const WIPE_IN = 150;
const WIPE_OUT = 172;
export const POSTER_FRAME = 130;

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

export const Thumb: React.FC<{ at?: number }> = ({ at }) => {
  const current = useCurrentFrame();
  const frame = at ?? current;
  const p = interpolate(frame, [COUNT_IN, COUNT_OUT], [0, 1], { ...clamp, easing: Easing.bezier(0.33, 0, 0.2, 1) });
  // Wipe edge travels across the board; left of it the board is already reset to zero.
  const wipeX = interpolate(frame, [WIPE_IN, WIPE_OUT], [-4, BOARD_W + 4], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const wiping = frame >= WIPE_IN && frame <= WIPE_OUT;

  return (
    <AbsoluteFill style={{ background: C.bg, color: C.fg }}>
      <div style={{ position: 'absolute', left: PAD, top: 64 }}>
        <Tally />
      </div>
      <div style={{ position: 'absolute', left: PAD - 4, top: 138, ...displayStyle, fontSize: 158, whiteSpace: 'nowrap' }}>
        Apuração 2026
      </div>

      <div style={{ position: 'absolute', left: PAD, top: BOARD_Y, width: BOARD_W }}>
        {frame < WIPE_IN || frame > WIPE_OUT ? (
          <Board p={frame > WIPE_OUT ? 0 : p} />
        ) : (
          <>
            <div style={{ clipPath: `inset(0 0 0 ${Math.max(0, wipeX)}px)` }}>
              <Board p={1} />
            </div>
            <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${BOARD_W - Math.max(0, wipeX)}px 0 0)` }}>
              <Board p={0} />
            </div>
            {wiping && (
              <div style={{ position: 'absolute', top: -12, bottom: -12, left: wipeX - 2, width: 4, background: C.fg }} />
            )}
          </>
        )}
      </div>

      <div style={{ position: 'absolute', left: PAD, top: 884 }}>
        <Pipeline frame={frame} width={BOARD_W} />
      </div>

      <Phone src="mobile-04-results.png" width={413} x={1600 - PAD - 413} y={64} />
    </AbsoluteFill>
  );
};

export const ApuracaoThumb: React.FC<{ figure?: FigureId }> = ({ figure }) =>
  figure ? <Figure id={figure} /> : <Thumb />;
