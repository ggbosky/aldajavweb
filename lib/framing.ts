import * as THREE from 'three';

/** Number of bars in the waveform array. */
export const BAR_COUNT = 150;
/** World-space gap between bars at scale 1. */
export const BAR_SPACING = 0.085;
/** Half the array's footprint in world units, plus a little margin. */
export const WAVEFORM_HALF_WIDTH = (BAR_COUNT * BAR_SPACING) / 2 + 0.4;

const MIN_Z = 12;
const MAX_Z = 22;
/** Distance the art direction was tuned at — a ~16:9 desktop viewport. */
const REFERENCE_Z = 15;

/**
 * Camera distance at which the whole bar array fits the viewport width, clamped so a
 * phone-shaped viewport never pushes the scene out of sight. Beyond the clamp the
 * array simply runs off both edges, which reads as a waveform continuing past frame.
 */
export function fitDistance(aspect: number, fovDegrees: number): number {
  const halfFov = THREE.MathUtils.degToRad(fovDegrees) / 2;
  const fit = WAVEFORM_HALF_WIDTH / (Math.tan(halfFov) * Math.max(aspect, 0.3));
  return THREE.MathUtils.clamp(fit, MIN_Z, MAX_Z);
}

/**
 * Compensating scale for the waveform group, so bars keep the same apparent height
 * on screen however far back the camera had to move to frame the viewport.
 */
export function waveformScale(distance: number): number {
  return THREE.MathUtils.clamp(distance / REFERENCE_Z, 1, 1.35);
}
