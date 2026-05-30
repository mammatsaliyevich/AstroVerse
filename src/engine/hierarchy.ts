import { ScaleLevel } from './scales';
import { NavNode, Vec3 } from './types';
import { catalog } from '../data/catalog';
import { CelestialObject } from '../types/celestial';

/**
 * Builds the navigation hierarchy from the celestial catalog plus three
 * synthetic container nodes (Universe, Milky Way, Solar System). The tree is
 * assembled once at module load and exposed through pure accessor functions.
 */

export const ROOT_ID = 'universe';

interface ContainerDef {
  id: string;
  name: string;
  scale: ScaleLevel;
  parentId: string | null;
}

const CONTAINERS: ContainerDef[] = [
  { id: 'universe', name: 'Observable Universe', scale: ScaleLevel.Universe, parentId: null },
  { id: 'milky_way', name: 'Milky Way', scale: ScaleLevel.Galaxy, parentId: 'universe' },
  { id: 'solar_system', name: 'Solar System', scale: ScaleLevel.SolarSystem, parentId: 'milky_way' },
];

function scaleForObject(o: CelestialObject): ScaleLevel {
  switch (o.kind) {
    case 'planet':
    case 'dwarf_planet':
      return ScaleLevel.Planet;
    case 'moon':
      return ScaleLevel.Moon;
    case 'black_hole':
      return ScaleLevel.Galaxy;
    case 'star':
      return o.id === 'sun' ? ScaleLevel.SolarSystem : ScaleLevel.Galaxy;
    default:
      return ScaleLevel.SolarSystem;
  }
}

function navParentFor(o: CelestialObject): string {
  if (o.kind === 'moon') return o.parentId ?? 'solar_system';
  if (o.kind === 'star') return o.id === 'sun' ? 'solar_system' : 'milky_way';
  if (o.kind === 'black_hole') return 'milky_way';
  return 'solar_system';
}


/** Distributes children evenly on a circle in the XZ plane. */
function radial(index: number, count: number, radius: number): Vec3 {
  const angle = count > 0 ? (index / count) * Math.PI * 2 : 0;
  return { x: Math.cos(angle) * radius, y: 0, z: Math.sin(angle) * radius };
}

function build(): Map<string, NavNode> {
  const nodes = new Map<string, NavNode>();

  for (const c of CONTAINERS) {
    nodes.set(c.id, {
      id: c.id,
      name: c.name,
      scale: c.scale,
      parentId: c.parentId,
      childIds: [],
      position: { x: 0, y: 0, z: 0 },
    });
  }

  for (const o of catalog) {
    nodes.set(o.id, {
      id: o.id,
      name: o.name,
      scale: scaleForObject(o),
      parentId: navParentFor(o),
      childIds: [],
      objectId: o.id,
      position: { x: 0, y: 0, z: 0 },
    });
  }

  for (const node of nodes.values()) {
    if (node.parentId && nodes.has(node.parentId)) {
      nodes.get(node.parentId)!.childIds.push(node.id);
    }
  }

  for (const node of nodes.values()) {
    const radius = 10 + node.childIds.length * 2;
    node.childIds.forEach((childId, i) => {
      const child = nodes.get(childId);
      if (child) child.position = radial(i, node.childIds.length, radius);
    });
  }

  return nodes;
}

const NODES = build();


export const getNode = (id: string): NavNode | undefined => NODES.get(id);

export const getChildren = (id: string): NavNode[] =>
  (NODES.get(id)?.childIds ?? [])
    .map((childId) => NODES.get(childId))
    .filter((n): n is NavNode => Boolean(n));

export const hasChildren = (id: string): boolean =>
  (NODES.get(id)?.childIds.length ?? 0) > 0;

/** Root-to-node path, used for breadcrumbs. */
export function getAncestors(id: string): NavNode[] {
  const path: NavNode[] = [];
  let current = NODES.get(id);
  while (current) {
    path.unshift(current);
    current = current.parentId ? NODES.get(current.parentId) : undefined;
  }
  return path;
}

export const allNodes = (): NavNode[] => Array.from(NODES.values());
