import { ScaleLevel, KIND_SCALE } from './scales';
import { NavNode, Vec3 } from './types';
import { catalog } from '../data/catalog';
import { CelestialObject } from '../types/celestial';

/**
 * The navigation hierarchy as an incremental registry.
 *
 * Scalability: nodes are stored in a Map and indexed parent -> children, so
 * lookups are O(1) and the tree can grow to millions of nodes. Nodes can be
 * registered in batches at any time (e.g. paged in from a server or generated
 * procedurally for a galaxy's stars) without rebuilding the whole structure —
 * call `registerObjects()` then `layout()` for the affected parents.
 */

export const ROOT_ID = 'universe';

interface ContainerDef {
  id: string;
  name: string;
  scale: ScaleLevel;
  parentId: string | null;
}

/**
 * Synthetic container nodes. `milky_way` and `solar_system` are temporary here
 * and become real catalog objects in the Cosmic Expansion data milestone.
 */
const CONTAINERS: ContainerDef[] = [
  { id: 'universe', name: 'Observable Universe', scale: ScaleLevel.Universe, parentId: null },
  { id: 'milky_way', name: 'Milky Way', scale: ScaleLevel.Galaxy, parentId: 'universe' },
  { id: 'solar_system', name: 'Solar System', scale: ScaleLevel.StarSystem, parentId: 'milky_way' },
];

/** Hierarchy parent resolution: explicit parentId wins, else a kind default. */
function navParentFor(o: CelestialObject): string {
  if (o.parentId) return o.parentId;
  switch (o.kind) {
    case 'supercluster':
    case 'quasar':
      return 'universe';
    case 'galaxy_cluster':
      return 'laniakea';
    case 'galaxy':
      return 'local_group';
    case 'star':
      return o.id === 'sun' ? 'solar_system' : 'milky_way';
    case 'star_system':
    case 'nebula':
    case 'neutron_star':
    case 'pulsar':
    case 'black_hole':
      return 'milky_way';
    default:
      return 'solar_system';
  }
}


/** Distributes children evenly on a circle in the XZ plane. */
function radial(index: number, count: number, radius: number): Vec3 {
  const angle = count > 0 ? (index / count) * Math.PI * 2 : 0;
  return { x: Math.cos(angle) * radius, y: 0, z: Math.sin(angle) * radius };
}

class HierarchyRegistry {
  private nodes = new Map<string, NavNode>();
  private childIndex = new Map<string, string[]>();

  register(node: NavNode): void {
    this.nodes.set(node.id, node);
    if (node.parentId) {
      const siblings = this.childIndex.get(node.parentId);
      if (siblings) {
        if (!siblings.includes(node.id)) siblings.push(node.id);
      } else {
        this.childIndex.set(node.parentId, [node.id]);
      }
    }
  }

  registerObjects(objects: CelestialObject[]): void {
    for (const o of objects) {
      this.register({
        id: o.id,
        name: o.name,
        scale: KIND_SCALE[o.kind],
        parentId: navParentFor(o),
        objectId: o.id,
        position: { x: 0, y: 0, z: 0 },
      });
    }
  }

  /** Recomputes sibling positions for every parent (cheap, idempotent). */
  layout(): void {
    for (const [, childIds] of this.childIndex) {
      const radius = 10 + childIds.length * 2;
      childIds.forEach((id, i) => {
        const node = this.nodes.get(id);
        if (node) node.position = radial(i, childIds.length, radius);
      });
    }
  }

  getNode(id: string): NavNode | undefined {
    return this.nodes.get(id);
  }

  getChildren(id: string): NavNode[] {
    return (this.childIndex.get(id) ?? [])
      .map((childId) => this.nodes.get(childId))
      .filter((n): n is NavNode => Boolean(n));
  }

  hasChildren(id: string): boolean {
    return (this.childIndex.get(id)?.length ?? 0) > 0;
  }

  ancestors(id: string): NavNode[] {
    const path: NavNode[] = [];
    let current = this.nodes.get(id);
    while (current) {
      path.unshift(current);
      current = current.parentId ? this.nodes.get(current.parentId) : undefined;
    }
    return path;
  }

  all(): NavNode[] {
    return Array.from(this.nodes.values());
  }
}


const registry = new HierarchyRegistry();

for (const c of CONTAINERS) {
  registry.register({
    id: c.id,
    name: c.name,
    scale: c.scale,
    parentId: c.parentId,
    position: { x: 0, y: 0, z: 0 },
  });
}
registry.registerObjects(catalog);
registry.layout();

// Public API (stable across the scalability refactor).
export const getNode = (id: string): NavNode | undefined => registry.getNode(id);
export const getChildren = (id: string): NavNode[] => registry.getChildren(id);
export const hasChildren = (id: string): boolean => registry.hasChildren(id);
export const getAncestors = (id: string): NavNode[] => registry.ancestors(id);
export const allNodes = (): NavNode[] => registry.all();
