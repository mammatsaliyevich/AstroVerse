import { SCALES } from './scales';
import { CameraState, CameraTransition, NavNode, Vec3 } from './types';

/**
 * Pure camera math for the navigation engine. The store records transitions as
 * {from, to, startedAt, durationMs}; a future Three.js renderer can call
 * `sampleTransition(transition, now)` every frame to interpolate the camera.
 */

export const TRANSITION_MS = 900;

export function computeCameraForNode(node: NavNode): CameraState {
  return {
    focusId: node.id,
    distance: SCALES[node.scale].cameraDistance,
    target: node.position,
  };
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpVec(a: Vec3, b: Vec3, t: number): Vec3 {
  return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), z: lerp(a.z, b.z, t) };
}

/** Interpolated camera at time `now` for an in-flight transition. */
export function sampleTransition(tr: CameraTransition, now: number): CameraState {
  const raw = tr.durationMs <= 0 ? 1 : (now - tr.startedAt) / tr.durationMs;
  const t = easeInOutCubic(Math.max(0, Math.min(1, raw)));
  return {
    focusId: t < 1 ? tr.fromId : tr.toId,
    distance: lerp(tr.from.distance, tr.to.distance, t),
    target: lerpVec(tr.from.target, tr.to.target, t),
  };
}

export function isTransitionDone(tr: CameraTransition, now: number): boolean {
  return now - tr.startedAt >= tr.durationMs;
}
