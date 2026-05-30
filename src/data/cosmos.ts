import { CelestialObject } from '../types/celestial';

/**
 * Large-scale cosmic structure: the supercluster, galaxy clusters, galaxies
 * and our star system. Parent links are explicit so the navigation hierarchy
 * is fully data-driven.
 */
export const cosmicStructures: CelestialObject[] = [
  {
    id: 'laniakea',
    name: 'Laniakea Supercluster',
    kind: 'supercluster',
    color: '#3b1d6e',
    tagline: 'Our home supercluster of ~100,000 galaxies',
    description:
      'Laniakea ("immense heaven") is the galaxy supercluster that contains the Milky Way, spanning over 500 million light-years and roughly 100,000 galaxies.',
    facts: [
      'Defined in 2014 by mapping galaxy flows.',
      'Spans about 520 million light-years.',
      'Its galaxies stream toward the Great Attractor.',
    ],
    stats: [
      { label: 'Diameter', value: '520M light-years' },
      { label: 'Galaxies', value: '~100,000' },
      { label: 'Mass', value: '~10¹⁷ M☉' },
      { label: 'Defined', value: '2014' },
    ],
    parentId: 'universe',
  },

  {
    id: 'virgo_cluster',
    name: 'Virgo Cluster',
    kind: 'galaxy_cluster',
    color: '#5a4fcf',
    tagline: 'Nearest large galaxy cluster · ~1,300 galaxies',
    description:
      'A massive cluster of more than 1,300 galaxies at the heart of the Virgo Supercluster, about 54 million light-years away.',
    facts: [
      'Contains the giant elliptical galaxy M87.',
      'Roughly 54 million light-years away.',
      'Its gravity slows the Local Group\'s recession.',
    ],
    stats: [
      { label: 'Galaxies', value: '~1,300' },
      { label: 'Distance', value: '54M light-years' },
      { label: 'Diameter', value: '~15M light-years' },
      { label: 'Core', value: 'M87' },
    ],
    parentId: 'laniakea',
  },
  {
    id: 'local_group',
    name: 'Local Group',
    kind: 'galaxy_cluster',
    color: '#4661c9',
    tagline: 'Our galaxy group · 80+ galaxies',
    description:
      'The cluster of more than 80 galaxies that includes the Milky Way, Andromeda and Triangulum, spanning about 10 million light-years.',
    facts: [
      'Dominated by the Milky Way and Andromeda.',
      'Spans about 10 million light-years.',
      'Andromeda and the Milky Way will merge in ~4.5 billion years.',
    ],
    stats: [
      { label: 'Galaxies', value: '80+' },
      { label: 'Diameter', value: '~10M light-years' },
      { label: 'Dominant', value: 'Milky Way, M31' },
      { label: 'Type', value: 'Galaxy group' },
    ],
    parentId: 'laniakea',
  },

  {
    id: 'milky_way',
    name: 'Milky Way',
    kind: 'galaxy',
    color: '#9bb0ff',
    emissive: true,
    tagline: 'Barred spiral galaxy · our home galaxy',
    description:
      'A barred spiral galaxy of 100-400 billion stars, home to the Solar System and about 100,000 light-years across.',
    facts: [
      'Holds an estimated 100-400 billion stars.',
      'About 100,000 light-years across.',
      'The Solar System orbits it every ~225 million years.',
    ],
    stats: [
      { label: 'Type', value: 'Barred spiral' },
      { label: 'Stars', value: '100-400 billion' },
      { label: 'Diameter', value: '100,000 ly' },
      { label: 'Core', value: 'Sagittarius A*' },
    ],
    parentId: 'local_group',
  },
  {
    id: 'andromeda',
    name: 'Andromeda Galaxy',
    kind: 'galaxy',
    color: '#a7b8ff',
    emissive: true,
    tagline: 'M31 · nearest major galaxy',
    description:
      'The Andromeda Galaxy (M31) is the nearest major galaxy to the Milky Way and the most distant object visible to the naked eye.',
    facts: [
      'About 2.5 million light-years away.',
      'Holds roughly one trillion stars.',
      'Will merge with the Milky Way in ~4.5 billion years.',
    ],
    stats: [
      { label: 'Type', value: 'Spiral' },
      { label: 'Stars', value: '~1 trillion' },
      { label: 'Distance', value: '2.5M light-years' },
      { label: 'Catalog', value: 'M31' },
    ],
    parentId: 'local_group',
  },

  {
    id: 'triangulum',
    name: 'Triangulum Galaxy',
    kind: 'galaxy',
    color: '#8fd0c0',
    emissive: true,
    tagline: 'M33 · third-largest in the Local Group',
    description:
      'The Triangulum Galaxy (M33) is a spiral galaxy and the third-largest member of the Local Group, possibly a satellite of Andromeda.',
    facts: [
      'About 2.7 million light-years away.',
      'Contains around 40 billion stars.',
      'Visible to the naked eye under dark skies.',
    ],
    stats: [
      { label: 'Type', value: 'Spiral' },
      { label: 'Stars', value: '~40 billion' },
      { label: 'Distance', value: '2.7M light-years' },
      { label: 'Catalog', value: 'M33' },
    ],
    parentId: 'local_group',
  },
  {
    id: 'm87',
    name: 'Messier 87',
    kind: 'galaxy',
    color: '#ffe9b0',
    emissive: true,
    tagline: 'Supergiant elliptical galaxy in Virgo',
    description:
      'A supergiant elliptical galaxy whose central black hole was the first ever directly imaged, by the Event Horizon Telescope in 2019.',
    facts: [
      'Hosts several trillion stars.',
      'About 53 million light-years away.',
      'Ejects a relativistic jet ~5,000 light-years long.',
    ],
    stats: [
      { label: 'Type', value: 'Elliptical' },
      { label: 'Distance', value: '53M light-years' },
      { label: 'Catalog', value: 'M87' },
      { label: 'Jet', value: '~5,000 ly' },
    ],
    parentId: 'virgo_cluster',
  },

  {
    id: 'solar_system',
    name: 'Solar System',
    kind: 'star_system',
    color: '#ffd27f',
    tagline: 'The Sun and everything bound to it',
    description:
      'The Sun and the planets, moons, asteroids and comets gravitationally bound to it, formed about 4.6 billion years ago.',
    facts: [
      'Formed roughly 4.6 billion years ago.',
      'Extends past the Kuiper Belt to the Oort Cloud.',
      'Eight planets orbit the Sun.',
    ],
    stats: [
      { label: 'Star', value: 'The Sun' },
      { label: 'Planets', value: '8' },
      { label: 'Age', value: '4.6 billion yr' },
      { label: 'Edge', value: 'Oort Cloud' },
    ],
    parentId: 'milky_way',
  },
];

export default cosmicStructures;
