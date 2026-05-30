/**
 * Domain types for celestial objects.
 */
export type CelestialType = 'planet' | 'star' | 'moon' | 'black_hole';

export interface Planet {
  id: string;
  name: string;
  type: CelestialType;
  /** Hex color used for the visual representation. */
  color: string;
  /** Mean radius in kilometers. */
  radiusKm: number;
  /** Mass in kilograms. */
  massKg: number;
  /** Surface gravity in m/s^2. */
  gravity: number;
  /** Rotation period (length of a day) in hours. */
  dayLengthHours: number;
  /** Orbital period (length of a year) in Earth days. */
  yearLengthDays: number;
  /** Average distance from the Sun in astronomical units. */
  distanceFromSunAu: number;
  /** Number of known natural satellites. */
  moons: number;
  /** Average surface/effective temperature in Celsius. */
  avgTempC: number;
  description: string;
  facts: string[];
}


/**
 * Generalized celestial object model (the "Celestial Object System").
 * This is the unified shape the universe browser and detail screen render,
 * regardless of object kind. Planets are mapped into this shape by the
 * catalog (see src/data/catalog.ts); the richer `Planet` type above is kept
 * for systems that need numeric planetary fields (e.g. the AI guide).
 */
export type CelestialKind =
  | 'supercluster'
  | 'galaxy_cluster'
  | 'galaxy'
  | 'nebula'
  | 'quasar'
  | 'star_system'
  | 'star'
  | 'neutron_star'
  | 'pulsar'
  | 'black_hole'
  | 'planet'
  | 'dwarf_planet'
  | 'moon'
  | 'comet'
  | 'asteroid'
  | 'spacecraft'
  | 'space_station';

/** A display-ready key/value statistic shown on the detail screen. */
export interface StatItem {
  label: string;
  value: string;
}

export interface CelestialObject {
  id: string;
  name: string;
  kind: CelestialKind;
  /** Display color / emissive tint (hex). */
  color: string;
  /** Whether the body emits its own light (stars). Adds a glow in the UI. */
  emissive?: boolean;
  /** Short subtitle used on cards and the detail header. */
  tagline: string;
  description: string;
  facts: string[];
  /** Display-ready stats, already formatted for the current kind. */
  stats: StatItem[];
  /** True when a surface exploration experience exists (Priority 2). */
  hasSurface?: boolean;
  /** Parent object id (moon -> planet, planet -> star). Enables hierarchy. */
  parentId?: string;
}

/** Human-readable label for each kind, used by the category navigator. */
export const KIND_LABELS: Record<CelestialKind, string> = {
  supercluster: 'Superclusters',
  galaxy_cluster: 'Galaxy Clusters',
  galaxy: 'Galaxies',
  nebula: 'Nebulae',
  quasar: 'Quasars',
  star_system: 'Star Systems',
  star: 'Stars',
  neutron_star: 'Neutron Stars',
  pulsar: 'Pulsars',
  black_hole: 'Black Holes',
  planet: 'Planets',
  dwarf_planet: 'Dwarf Planets',
  moon: 'Moons',
  comet: 'Comets',
  asteroid: 'Asteroids',
  spacecraft: 'Spacecraft',
  space_station: 'Space Stations',
};
