/**
 * Surface exploration data. Each explorable body declares its environment and
 * a set of landmarks. Adding a new world is purely additive: drop another
 * entry into `surfaces` and the SurfaceScreen renders it with no code changes.
 */

export type LandmarkType =
  | 'mountain'
  | 'volcano'
  | 'canyon'
  | 'crater'
  | 'mare'
  | 'ice'
  | 'trench'
  | 'forest';

export interface SurfaceLandmark {
  id: string;
  name: string;
  type: LandmarkType;
  description: string;
  facts: string[];
  coordinates?: string;
}

export interface SurfaceEnvironment {
  atmosphere: string;
  gravity: string;
  temperature: string;
  dayLength: string;
  /** Two-stop sky gradient (zenith -> horizon) for the landing scene. */
  skyColors: [string, string];
  /** Terrain color band. */
  groundColor: string;
}

export interface SurfaceData {
  objectId: string;
  name: string;
  tagline: string;
  environment: SurfaceEnvironment;
  landmarks: SurfaceLandmark[];
}


export const LANDMARK_ICON: Record<LandmarkType, string> = {
  mountain: '⛰️',
  volcano: '🌋',
  canyon: '🏜️',
  crater: '🕳️',
  mare: '🌑',
  ice: '🧊',
  trench: '🌊',
  forest: '🌳',
};

export const surfaces: Record<string, SurfaceData> = {
  mars: {
    objectId: 'mars',
    name: 'Mars',
    tagline: 'The rusty deserts of the Red Planet',
    environment: {
      atmosphere: "Thin CO₂ (95%), ~1% of Earth's pressure",
      gravity: '3.72 m/s² — 38% of Earth',
      temperature: '−153°C to 20°C (avg −63°C)',
      dayLength: '24h 37m (1 sol)',
      skyColors: ['#caa07a', '#e8b98a'],
      groundColor: '#a14d28',
    },
    landmarks: [
      {
        id: 'olympus_mons',
        name: 'Olympus Mons',
        type: 'volcano',
        description: 'The tallest volcano and mountain in the Solar System.',
        facts: [
          'Rises about 22 km — roughly 2.5× Mount Everest.',
          'Its base would nearly cover the state of Arizona.',
          'A gently sloping shield volcano with a vast summit caldera.',
        ],
        coordinates: '18.65°N 226.2°E',
      },
      {
        id: 'valles_marineris',
        name: 'Valles Marineris',
        type: 'canyon',
        description: 'A canyon system stretching over 4,000 km.',
        facts: [
          'Up to 7 km deep in places.',
          'About ten times longer than the Grand Canyon.',
          "Spans nearly a quarter of Mars' circumference.",
        ],
        coordinates: '13.9°S 301.4°E',
      },
      {
        id: 'mars_polar_caps',
        name: 'Polar Ice Caps',
        type: 'ice',
        description: 'Layered caps of water and frozen CO₂ at the poles.',
        facts: [
          'Grow and shrink with the Martian seasons.',
          'Hold enough water ice to cover the planet meters deep.',
          'Record Mars\u2019 climate history in their layers.',
        ],
      },
    ],
  },

  earth: {
    objectId: 'earth',
    name: 'Earth',
    tagline: 'The only known world teeming with life',
    environment: {
      atmosphere: '78% N₂, 21% O₂ — breathable',
      gravity: '9.81 m/s² — the reference',
      temperature: '−89°C to 57°C (avg 15°C)',
      dayLength: '24 hours',
      skyColors: ['#3a7bd5', '#bfe3ff'],
      groundColor: '#2f7d4f',
    },
    landmarks: [
      {
        id: 'everest',
        name: 'Mount Everest',
        type: 'mountain',
        description: "Earth's highest peak above sea level.",
        facts: [
          'Summit reaches 8,849 m.',
          'Its peak sits within the jet stream.',
          'It grows a few millimeters taller each year.',
        ],
        coordinates: '27.99°N 86.93°E',
      },
      {
        id: 'mariana_trench',
        name: 'Mariana Trench',
        type: 'trench',
        description: "The deepest known point in Earth's oceans.",
        facts: [
          'Reaches about 11,000 m below sea level.',
          'Mount Everest would sit fully submerged inside it.',
          'Explored by crewed dives in 1960 and 2012.',
        ],
        coordinates: '11.35°N 142.2°E',
      },
      {
        id: 'amazon',
        name: 'Amazon Rainforest',
        type: 'forest',
        description: 'The largest tropical rainforest on Earth.',
        facts: [
          'Spans about 5.5 million km² across nine countries.',
          'Home to roughly 10% of known species.',
          'Helps regulate the planet\u2019s climate and water cycle.',
        ],
      },
    ],
  },

  luna: {
    objectId: 'luna',
    name: 'The Moon',
    tagline: 'A silent, airless world of grey dust',
    environment: {
      atmosphere: 'Effectively none (thin exosphere)',
      gravity: '1.62 m/s² — 17% of Earth',
      temperature: '−173°C to 127°C',
      dayLength: '~29.5 Earth days',
      skyColors: ['#05060a', '#0a0a16'],
      groundColor: '#8a8a8a',
    },
    landmarks: [
      {
        id: 'tycho',
        name: 'Tycho Crater',
        type: 'crater',
        description: 'A bright young crater with sweeping ray systems.',
        facts: [
          'About 85 km across.',
          'Its bright rays stretch over 1,500 km.',
          'Roughly 108 million years old.',
        ],
        coordinates: '43.3°S 11.4°W',
      },
      {
        id: 'mare_tranquillitatis',
        name: 'Mare Tranquillitatis',
        type: 'mare',
        description: 'The Sea of Tranquility — site of the first crewed landing.',
        facts: [
          'Apollo 11 landed here in July 1969.',
          'A vast basaltic lava plain.',
          'Its smoothness made it a safe landing site.',
        ],
        coordinates: '8.5°N 31.4°E',
      },
      {
        id: 'shackleton',
        name: 'Shackleton Crater',
        type: 'crater',
        description: 'A polar crater whose floor never sees sunlight.',
        facts: [
          'Sits almost exactly at the lunar south pole.',
          'Its permanently shadowed floor holds water ice.',
          'A prime target for future lunar bases.',
        ],
        coordinates: '89.9°S',
      },
    ],
  },
};

export const getSurface = (objectId: string): SurfaceData | undefined =>
  surfaces[objectId];

export const hasSurfaceData = (objectId: string): boolean => objectId in surfaces;
