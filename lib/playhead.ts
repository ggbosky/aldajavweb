/**
 * A tiny, render-free bridge between native page scroll and the WebGL scene.
 *
 * Why not `useScroll()` from @react-three/drei: that hook requires <ScrollControls>,
 * which replaces native page scrolling with its own transformed container. That breaks
 * `position: sticky`, native anchor links, keyboard scrolling and SEO-friendly document
 * flow — all of which this layout depends on. Instead we read `window.scrollY` once per
 * frame in a single rAF loop and expose the identical value (`0 → 1` playhead progress)
 * to both the R3F scene and the DOM HUD, with zero React re-renders.
 */

export type PlayheadState = {
  /** Raw scroll progress of the document, 0 → 1. */
  progress: number;
  /** Critically damped progress — what the scene actually renders. */
  smooth: number;
  /** Signed scrub speed, roughly -1 → 1. Drives the "scrubbing" distortion. */
  velocity: number;
  /** Normalised pointer, -1 → 1 on both axes, origin at viewport centre. */
  pointerX: number;
  pointerY: number;
  /** True once the user has scrolled at least one viewport. */
  engaged: boolean;
  /** Honour the OS "reduce motion" setting. */
  reducedMotion: boolean;
};

export const playhead: PlayheadState = {
  progress: 0,
  smooth: 0,
  velocity: 0,
  pointerX: 0,
  pointerY: 0,
  engaged: false,
  reducedMotion: false,
};

/** Total runtime of the fictional "master sequence", in seconds. */
export const SEQUENCE_SECONDS = 252;
export const SEQUENCE_FPS = 25;

/** Formats a 0–1 progress value as an NLE timecode: HH:MM:SS:FF. */
export function formatTimecode(progress: number): string {
  const clamped = Math.min(Math.max(progress, 0), 1);
  const totalFrames = Math.round(clamped * SEQUENCE_SECONDS * SEQUENCE_FPS);
  const frames = totalFrames % SEQUENCE_FPS;
  const totalSeconds = Math.floor(totalFrames / SEQUENCE_FPS);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);
  const pad = (n: number): string => n.toString().padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
}

type Unsubscribe = () => void;

let refCount = 0;
let rafId = 0;
let lastProgress = 0;
let targetPointerX = 0;
let targetPointerY = 0;

function readProgress(): number {
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - window.innerHeight;
  if (scrollable <= 0) return 0;
  return Math.min(Math.max(window.scrollY / scrollable, 0), 1);
}

function onPointerMove(event: PointerEvent): void {
  targetPointerX = (event.clientX / window.innerWidth) * 2 - 1;
  targetPointerY = -((event.clientY / window.innerHeight) * 2 - 1);
}

function tick(): void {
  const next = readProgress();
  playhead.velocity += ((next - lastProgress) * 40 - playhead.velocity) * 0.12;
  lastProgress = next;
  playhead.progress = next;
  playhead.smooth += (next - playhead.smooth) * (playhead.reducedMotion ? 1 : 0.12);
  playhead.pointerX += (targetPointerX - playhead.pointerX) * 0.08;
  playhead.pointerY += (targetPointerY - playhead.pointerY) * 0.08;
  playhead.engaged = next > 0.015;
  rafId = window.requestAnimationFrame(tick);
}

/**
 * Starts the shared rAF loop. Safe to call from several components — the loop is
 * reference counted and only ever runs once.
 */
export function startPlayhead(): Unsubscribe {
  if (typeof window === 'undefined') return () => undefined;

  refCount += 1;
  if (refCount === 1) {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    playhead.reducedMotion = motionQuery.matches;
    const onMotionChange = (event: MediaQueryListEvent): void => {
      playhead.reducedMotion = event.matches;
    };
    motionQuery.addEventListener('change', onMotionChange);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    lastProgress = readProgress();
    playhead.progress = lastProgress;
    playhead.smooth = lastProgress;
    rafId = window.requestAnimationFrame(tick);

    return () => {
      refCount -= 1;
      if (refCount === 0) {
        window.cancelAnimationFrame(rafId);
        window.removeEventListener('pointermove', onPointerMove);
        motionQuery.removeEventListener('change', onMotionChange);
      }
    };
  }

  return () => {
    refCount -= 1;
  };
}
