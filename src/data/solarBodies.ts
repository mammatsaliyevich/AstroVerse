import { CelestialObject } from '../types/celestial';

/**
 * Smaller Solar-System bodies and human-made objects: a comet, an asteroid, a
 * dwarf planet, a deep-space probe, and a space station. These exercise the
 * remaining celestial kinds and slot into the Solar System / Earth subtree.
 */
export const solarBodies: CelestialObject[] = [
  {
    id: 'halley',
    name: "Halley's Comet",
    kind: 'comet',
    color: '#9fd8e0',
    tagline: 'Most famous short-period comet',
    description:
      'Halley\'s Comet is the only naked-eye comet that can appear twice in a human lifetime, returning to the inner Solar System about every 76 years.',
    facts: [
      'Last seen in 1986; returns around 2061.',
      'Its nucleus is about 15 km long.',
      'Observed for more than 2,000 years.',
    ],
    stats: [
      { label: 'Period', value: '~76 years' },
      { label: 'Nucleus', value: '~15 km' },
      { label: 'Next return', value: '2061' },
      { label: 'Type', value: 'Short-period' },
    ],
    parentId: 'solar_system',
  },

  {
    id: 'vesta',
    name: 'Vesta',
    kind: 'asteroid',
    color: '#b8a88f',
    tagline: 'One of the largest asteroids',
    description:
      'Vesta is the second-most-massive body in the asteroid belt and the brightest asteroid visible from Earth, visited by NASA\'s Dawn spacecraft in 2011.',
    facts: [
      'About 525 km in diameter.',
      'Holds nearly 9% of the asteroid belt\'s mass.',
      'Visited by NASA\'s Dawn spacecraft in 2011.',
    ],
    stats: [
      { label: 'Diameter', value: '~525 km' },
      { label: 'Location', value: 'Asteroid belt' },
      { label: 'Visited', value: '2011 (Dawn)' },
      { label: 'Type', value: 'Asteroid' },
    ],
    parentId: 'solar_system',
  },
  {
    id: 'pluto',
    name: 'Pluto',
    kind: 'dwarf_planet',
    color: '#d8b89a',
    tagline: 'Best-known dwarf planet in the Kuiper Belt',
    description:
      'Pluto is a dwarf planet in the Kuiper Belt, explored up close by NASA\'s New Horizons probe in 2015, revealing a heart-shaped nitrogen-ice plain.',
    facts: [
      'Reclassified as a dwarf planet in 2006.',
      'It has five known moons, the largest being Charon.',
      'New Horizons flew past it in 2015.',
    ],
    stats: [
      { label: 'Radius', value: '1,188 km' },
      { label: 'Distance', value: '39.5 AU' },
      { label: 'Moons', value: '5' },
      { label: 'Type', value: 'Dwarf planet' },
    ],
    parentId: 'solar_system',
  },

  {
    id: 'voyager1',
    name: 'Voyager 1',
    kind: 'spacecraft',
    color: '#cdd3da',
    tagline: 'Most distant human-made object',
    description:
      'Launched in 1977, Voyager 1 is the most distant human-made object and the first to cross into interstellar space, still transmitting today.',
    facts: [
      'Launched on 5 September 1977.',
      'Entered interstellar space in 2012.',
      'Carries the Golden Record for any finders.',
    ],
    stats: [
      { label: 'Launched', value: '1977' },
      { label: 'Distance', value: '>24 billion km' },
      { label: 'Status', value: 'Interstellar' },
      { label: 'Type', value: 'Probe' },
    ],
    parentId: 'solar_system',
  },
  {
    id: 'iss',
    name: 'International Space Station',
    kind: 'space_station',
    color: '#e6edf5',
    tagline: 'Crewed laboratory orbiting Earth',
    description:
      'The ISS is a habitable space station in low Earth orbit, continuously crewed since 2000 and operated by a partnership of space agencies.',
    facts: [
      'Orbits Earth every ~90 minutes.',
      'Crewed continuously since November 2000.',
      'Travels at about 28,000 km/h.',
    ],
    stats: [
      { label: 'Altitude', value: '~420 km' },
      { label: 'Speed', value: '28,000 km/h' },
      { label: 'Crewed since', value: '2000' },
      { label: 'Orbit', value: '~90 min' },
    ],
    parentId: 'earth',
  },
];

export default solarBodies;
