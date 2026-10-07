import { interpolate, spring } from 'remotion';
import { THUMB } from '../shared/theme';

export const FPS = THUMB.fps;
export const LOOP = THUMB.durationInFrames;

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/** 0..1 ramp between two frames, clamped. */
export const ramp = (f: number, a: number, b: number): number => interpolate(f, [a, b], [0, 1], clamp);

/** Up at `a`, down at `b`, with `fade` frames on each side. */
export const window = (f: number, a: number, b: number, fade = 6): number =>
  Math.min(ramp(f, a, a + fade), 1 - ramp(f, b - fade, b));

/** Spring that starts at `start`, overshoot kept small. */
export const pop = (f: number, start: number): number =>
  spring({ frame: f - start, fps: FPS, config: { damping: 14, stiffness: 180, mass: 0.6 } });

/** Eased travel between two x positions over [a, b]. */
export const travel = (f: number, a: number, b: number, x0: number, x1: number): number =>
  interpolate(f, [a, b], [x0, x1], { ...clamp, easing: (t) => 1 - Math.pow(1 - t, 3) });

// Story beats, in frames. Frame 0 and frame 179 are the same idle state.
export const BEAT = {
  warnOut: 28, // MAM's executor raises a warning
  warnIn: 58, // warning reaches playout: HOLD
  clearOut: 92, // standards desk clears it
  clearIn: 114, // clearance reaches playout: HOLD lifts, story goes on air
  airEnd: 168, // tally off, back to idle before the loop point
} as const;
