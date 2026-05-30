/**
 * Scale levels for the Universe Navigation Engine. Each level defines a camera
 * distance (scene units, consumed later by a Three.js / Expo GL renderer) and
 * descriptive metadata for the HUD. Ordering runs from most zoomed-out
 * (Universe) to most zoomed-in (Surface).
 */
export enum ScaleLevel {
  Universe = 'universe',
  Galaxy = 'galaxy',
  SolarSystem = 'solar_system',
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
  [ScaleLevel.Galaxy]: { level: ScaleLevel.Galaxy, label: 'Milky Way Galaxy', order: 1, cameraDistance: 100_000, span: '100,000 light-years' },
  [ScaleLevel.SolarSystem]: { level: ScaleLevel.SolarSystem, label: 'Solar System', order: 2, cameraDistance: 1_000, span: '~9 billion km' },
  [ScaleLevel.Planet]: { level: ScaleLevel.Planet, label: 'Planetary', order: 3, cameraDistance: 50, span: 'thousands of km' },
  [ScaleLevel.Moon]: { level: ScaleLevel.Moon, label: 'Lunar', order: 4, cameraDistance: 10, span: 'hundreds of km' },
  [ScaleLevel.Surface]: { level: ScaleLevel.Surface, label: 'Surface', order: 5, cameraDistance: 2, span: 'ground level' },
};

export const SCALE_ORDER: ScaleLevel[] = [
  ScaleLevel.Universe,
  ScaleLevel.Galaxy,
  ScaleLevel.SolarSystem,
  ScaleLevel.Planet,
  ScaleLevel.Moon,
  ScaleLevel.Surface,
];
