import * as THREE from 'three';

/** Frames on the strip. Enough to cover the viewport plus the whole scrub travel. */
export const FRAME_COUNT = 30;
/** A 16:9 gate, in world units. */
export const FRAME_HEIGHT = 0.78;
export const FRAME_WIDTH = (FRAME_HEIGHT * 16) / 9;
/** The bar line between two frames. */
export const FRAME_GAP = 0.1;
/** Distance from one frame's centre to the next. */
export const FRAME_PITCH = FRAME_WIDTH + FRAME_GAP;
/** Film base above and below the image area — where the perforations sit. */
export const PERF_BAND = 0.24;
export const BAND_HEIGHT = FRAME_HEIGHT + PERF_BAND * 2;
/** Centre of a perforation row, measured from the bottom edge of the strip. */
export const PERF_INSET = PERF_BAND / 2;
/** Full strip footprint. */
export const STRIP_WIDTH = FRAME_COUNT * FRAME_PITCH;
/** How far the strip travels past the gate across the whole document. */
export const STRIP_TRAVEL = FRAME_PITCH * 10;

/** Frame centre offset for instance `index`, with the strip centred on its own origin. */
export function frameOffset(index: number): number {
  return (index - (FRAME_COUNT - 1) / 2) * FRAME_PITCH;
}

/** How much of the strip the art direction wants across a desktop viewport. */
const STRIP_VIEW_WIDTH = FRAME_PITCH * 11;

const MIN_Z = 13;
const MAX_Z = 20;
/** Distance the framing was tuned at — a ~16:9 desktop viewport. */
const REFERENCE_Z = 18;

/**
 * Camera distance that puts ~11 frames across the viewport, clamped so a phone-shaped
 * viewport never pushes the strip out of sight. Past the clamp the strip simply runs
 * off both edges, which is what a film strip should do anyway.
 */
export function fitDistance(aspect: number, fovDegrees: number): number {
  const halfFov = THREE.MathUtils.degToRad(fovDegrees) / 2;
  const fit = STRIP_VIEW_WIDTH / (2 * Math.tan(halfFov) * Math.max(aspect, 0.3));
  return THREE.MathUtils.clamp(fit, MIN_Z, MAX_Z);
}

/**
 * Compensating scale for the strip group. The clamp is deliberately tight: on a narrow
 * viewport the rig hits MAX_Z and simply shows fewer, larger frames, which reads far
 * better on a phone than shrinking the whole strip into a hairline.
 */
export function stripScale(distance: number): number {
  return THREE.MathUtils.clamp(REFERENCE_Z / distance, 0.85, 1.1);
}
