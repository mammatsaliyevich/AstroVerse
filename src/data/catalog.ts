import { planets } from './planets';
import {
  CelestialObject,
  CelestialKind,
  StatItem,
  Planet,
} from '../types/celestial';

/**
 * The unified celestial catalog. Planets are mapped from the planetary data
 * set; stars, moons, and the galactic black hole are authored directly as
 * CelestialObjects. This module is the single source of truth for the
 * universe browser and the object detail screen.
 */

function planetToObject(p: Planet): CelestialObject {
  const stats: StatItem[] = [
    { label: 'Radius', value: `${p.radiusKm.toLocaleString()} km` },
    { label: 'Gravity', value: `${p.gravity} m/s²` },
    { label: 'Day length', value: `${p.dayLengthHours} h` },
    { label: 'Year length', value: `${p.yearLengthDays} days` },
    { label: 'Avg. temp', value: `${p.avgTempC}°C` },
    { label: 'Moons', value: `${p.moons}` },
  ];
  return {
    id: p.id,
    name: p.name,
    kind: 'planet',
    color: p.color,
    tagline: `Planet · ${p.distanceFromSunAu} AU from the Sun`,
    description: p.description,
    facts: p.facts,
    stats,
    hasSurface: p.id === 'mars' || p.id === 'earth',
    parentId: 'sun',
  };
}

const planetObjects: CelestialObject[] = planets.map(planetToObject);


const stars: CelestialObject[] = [
  {
    id: 'sun',
    name: 'The Sun',
    kind: 'star',
    color: '#fdb813',
    emissive: true,
    tagline: 'G-type main-sequence star · our home star',
    description:
      'The star at the center of the Solar System, a near-perfect sphere of hot plasma that accounts for 99.86% of the system\'s mass.',
    facts: [
      'Its core reaches about 15 million °C.',
      'Light takes about 8 minutes to reach Earth.',
      'It fuses 600 million tonnes of hydrogen every second.',
    ],
    stats: [
      { label: 'Spectral type', value: 'G2V' },
      { label: 'Surface temp', value: '5,505 °C' },
      { label: 'Radius', value: '696,340 km' },
      { label: 'Mass', value: '1.989 × 10³⁰ kg' },
      { label: 'Age', value: '4.6 billion yr' },
    ],
  },
  {
    id: 'sirius',
    name: 'Sirius',
    kind: 'star',
    color: '#cfe8ff',
    emissive: true,
    tagline: 'Brightest star in Earth\'s night sky',
    description:
      'A binary system dominated by Sirius A, a hot blue-white main-sequence star 8.6 light-years away.',
    facts: [
      'It is nearly twice the mass of the Sun.',
      'Its companion, Sirius B, is a dense white dwarf.',
      'Ancient Egyptians timed the Nile floods by its rising.',
    ],
    stats: [
      { label: 'Spectral type', value: 'A1V' },
      { label: 'Surface temp', value: '9,940 °C' },
      { label: 'Distance', value: '8.6 light-years' },
      { label: 'Luminosity', value: '25 × Sun' },
    ],
  },
  {
    id: 'betelgeuse',
    name: 'Betelgeuse',
    kind: 'star',
    color: '#ff6e4a',
    emissive: true,
    tagline: 'Red supergiant nearing the end of its life',
    description:
      'A colossal red supergiant in Orion that may explode as a supernova within the next 100,000 years.',
    facts: [
      'If placed at the Sun, it would engulf Mars\' orbit.',
      'It has a variable, dimming brightness.',
      'Its supernova would be visible in daylight.',
    ],
    stats: [
      { label: 'Spectral type', value: 'M1-2' },
      { label: 'Surface temp', value: '3,200 °C' },
      { label: 'Distance', value: '~640 light-years' },
      { label: 'Radius', value: '~764 × Sun' },
    ],
  },
];


const moons: CelestialObject[] = [
  {
    id: 'luna',
    name: 'The Moon',
    kind: 'moon',
    color: '#c9c9c9',
    tagline: 'Earth\'s only natural satellite',
    description:
      'The fifth-largest moon in the Solar System and the only world beyond Earth that humans have walked on.',
    facts: [
      'It is slowly drifting ~3.8 cm away from Earth each year.',
      'The same side always faces Earth (tidal locking).',
      'Twelve people have walked on its surface.',
    ],
    stats: [
      { label: 'Radius', value: '1,737 km' },
      { label: 'Gravity', value: '1.62 m/s²' },
      { label: 'Day length', value: '708 h' },
      { label: 'Distance', value: '384,400 km' },
    ],
    hasSurface: true,
    parentId: 'earth',
  },
  {
    id: 'titan',
    name: 'Titan',
    kind: 'moon',
    color: '#e3a857',
    tagline: 'Saturn\'s largest moon · thick atmosphere',
    description:
      'The only moon with a dense atmosphere and the only known world besides Earth with stable surface liquids — lakes of methane and ethane.',
    facts: [
      'Its atmosphere is denser than Earth\'s.',
      'It rains liquid methane on Titan.',
      'It is larger than the planet Mercury.',
    ],
    stats: [
      { label: 'Radius', value: '2,575 km' },
      { label: 'Gravity', value: '1.35 m/s²' },
      { label: 'Surface temp', value: '-179 °C' },
      { label: 'Distance', value: '1.2 million km' },
    ],
    parentId: 'saturn',
  },
  {
    id: 'europa',
    name: 'Europa',
    kind: 'moon',
    color: '#d9cbb2',
    tagline: 'Icy moon of Jupiter · subsurface ocean',
    description:
      'A smooth, icy Galilean moon thought to hide a global saltwater ocean beneath its crust — a prime target in the search for life.',
    facts: [
      'Its ocean may hold twice Earth\'s water.',
      'Its surface is among the smoothest in the Solar System.',
      'Tidal heating keeps the ocean liquid.',
    ],
    stats: [
      { label: 'Radius', value: '1,561 km' },
      { label: 'Gravity', value: '1.31 m/s²' },
      { label: 'Surface temp', value: '-160 °C' },
      { label: 'Distance', value: '671,000 km' },
    ],
    parentId: 'jupiter',
  },
];


const blackHoles: CelestialObject[] = [
  {
    id: 'sagittarius_a',
    name: 'Sagittarius A*',
    kind: 'black_hole',
    color: '#1b1030',
    tagline: 'Supermassive black hole at the Milky Way\'s heart',
    description:
      'The supermassive black hole at the center of our galaxy, around which the entire Milky Way rotates. Imaged by the Event Horizon Telescope in 2022.',
    facts: [
      'It holds about 4.3 million times the Sun\'s mass.',
      'Nothing, not even light, escapes its event horizon.',
      'Stars near it orbit at thousands of km per second.',
    ],
    stats: [
      { label: 'Type', value: 'Supermassive' },
      { label: 'Mass', value: '4.3 million × Sun' },
      { label: 'Distance', value: '26,000 light-years' },
      { label: 'Event horizon', value: '~12 million km' },
    ],
  },
];

/** Ordered roughly by scale: stars, planets, moons, then the galactic core. */
export const catalog: CelestialObject[] = [
  ...stars,
  ...planetObjects,
  ...moons,
  ...blackHoles,
];

export const getObjectById = (id: string): CelestialObject | undefined =>
  catalog.find((o) => o.id === id);

export const getObjectsByKind = (kind: CelestialKind): CelestialObject[] =>
  catalog.filter((o) => o.kind === kind);

/** Kinds present in the catalog, in display order, for the category navigator. */
export const catalogKinds: CelestialKind[] = [
  'star',
  'planet',
  'moon',
  'black_hole',
];

export default catalog;
