/**
 * Scale levels for the Universe Navigation Engine. Each level defines a camera
 * distance (scene units, consumed later by a Three.js / Expo GL renderer) and
 * descriptive metadata for the HUD. Ordering runs from most zoomed-out
 * (Universe) to most zoomed-in (Surface).
 */
import { CelestialKind } from '../types/celestial';

export enum ScaleLevel {
  Universe = 'universe',
  Supercluster = 'supercluster',
  GalaxyCluster = 'galaxy_cluster',
  Galaxy = 'galaxy',
  Nebula = 'nebula',
  StarSystem = 'star_system',
  Star = 'star',
  Planet = 'planet',
  Moon = 'moon',
  Surface = 'surface',
}

export interface ScaleConfig {
  level: ScaleLevel;
  label: string;
  /** 0 = most zoomed out. */
  order: number;
  /** Camera distance from focus, in scene units (future 3D renderer). */
  cameraDistance: number;
  /** Human-readable span shown in the HUD. */
  span: string;
}


export const SCALES: Record<ScaleLevel, ScaleConfig> = {
  [ScaleLevel.Universe]: { level: ScaleLevel.Universe, label: 'Observable Universe', order: 0, cameraDistance: 1_000_000, span: '93 billion light-years' },
  [ScaleLevel.Supercluster]: { level: ScaleLevel.Supercluster, label: 'Supercluster', order: 1, cameraDistance: 500_000, span: '~520 million light-years' },
  [ScaleLevel.GalaxyCluster]: { level: ScaleLevel.GalaxyCluster, label: 'Galaxy Cluster', order: 2, cameraDistance: 200_000, span: 'millions of light-years' },
  [ScaleLevel.Galaxy]: { level: ScaleLevel.Galaxy, label: 'Galaxy', order: 3, cameraDistance: 100_000, span: '100,000 light-years' },
  [ScaleLevel.Nebula]: { level: ScaleLevel.Nebula, label: 'Nebula', order: 4, cameraDistance: 5_000, span: 'tens of light-years' },
  [ScaleLevel.StarSystem]: { level: ScaleLevel.StarSystem, label: 'Star System', order: 5, cameraDistance: 1_000, span: 'light-hours to light-years' },
  [ScaleLevel.Star]: { level: ScaleLevel.Star, label: 'Stellar', order: 6, cameraDistance: 100, span: 'millions of km' },
  [ScaleLevel.Planet]: { level: ScaleLevel.Planet, label: 'Planetary', order: 7, cameraDistance: 50, span: 'thousands of km' },
  [ScaleLevel.Moon]: { level: ScaleLevel.Moon, label: 'Lunar', order: 8, cameraDistance: 10, span: 'hundreds of km' },
  [ScaleLevel.Surface]: { level: ScaleLevel.Surface, label: 'Surface', order: 9, cameraDistance: 2, span: 'ground level' },
};

export const SCALE_ORDER: ScaleLevel[] = [
  ScaleLevel.Universe,
  ScaleLevel.Supercluster,
  ScaleLevel.GalaxyCluster,
  ScaleLevel.Galaxy,
  ScaleLevel.Nebula,
  ScaleLevel.StarSystem,
  ScaleLevel.Star,
  ScaleLevel.Planet,
  ScaleLevel.Moon,
  ScaleLevel.Surface,
];


/**
 * Maps every celestial kind to the scale tier used for camera framing and HUD
 * labels. Table-driven so new kinds get a sensible default without touching
 * navigation logic.
 */
export const KIND_SCALE: Record<CelestialKind, ScaleLevel> = {
  supercluster: ScaleLevel.Supercluster,
  galaxy_cluster: ScaleLevel.GalaxyCluster,
  galaxy: ScaleLevel.Galaxy,
  quasar: ScaleLevel.Galaxy,
  nebula: ScaleLevel.Nebula,
  star_system: ScaleLevel.StarSystem,
  star: ScaleLevel.Star,
  neutron_star: ScaleLevel.Star,
  pulsar: ScaleLevel.Star,
  black_hole: ScaleLevel.Star,
  planet: ScaleLevel.Planet,
  dwarf_planet: ScaleLevel.Planet,
  comet: ScaleLevel.Planet,
  asteroid: ScaleLevel.Planet,
  moon: ScaleLevel.Moon,
  spacecraft: ScaleLevel.Moon,
  space_station: ScaleLevel.Moon,
};
