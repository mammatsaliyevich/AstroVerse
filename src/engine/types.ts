import { ScaleLevel } from './scales';

/** Minimal 3D vector; renderer-agnostic so it maps cleanly to THREE.Vector3. */
export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

/**
 * A node in the navigation hierarchy: Universe -> Galaxy -> Solar System ->
 * Planet -> Moon. Container nodes (universe/galaxy/system) have no `objectId`;
 * concrete bodies carry the catalog object id they represent.
 */
export interface NavNode {
  id: string;
  name: string;
  scale: ScaleLevel;
  parentId: string | null;
  /** Deprecated: children are resolved via the hierarchy registry index. */
  childIds?: string[];
  /** Catalog CelestialObject id, when this node is a concrete body. */
  objectId?: string;
  /** Local position within the parent's space (for future 3D layout). */
  position: Vec3;
}

/** Where the camera is looking and how far away it sits. */
export interface CameraState {
  focusId: string;
  distance: number;
  target: Vec3;
}

/** A zoom/travel transition between two camera states. */
export interface CameraTransition {
  fromId: string;
  toId: string;
  from: CameraState;
  to: CameraState;
  startedAt: number;
  durationMs: number;
}

/** An entry in the exploration history log. */
export interface HistoryEntry {
  nodeId: string;
  at: number;
}
