import { CelestialObject } from '../types/celestial';

/**
 * Deep-sky exotic objects: nebulae, pulsars, an isolated neutron star, a
 * distant quasar, and the M87 black hole. Parent links place each within the
 * Milky Way, M87, or the wider Universe.
 */
export const deepSkyObjects: CelestialObject[] = [
  {
    id: 'orion_nebula',
    name: 'Orion Nebula',
    kind: 'nebula',
    color: '#d56b9c',
    emissive: true,
    tagline: 'M42 · nearest stellar nursery',
    description:
      'The Orion Nebula (M42) is the closest large region of active star formation, visible to the naked eye in Orion\'s sword.',
    facts: [
      'About 1,344 light-years away.',
      'Roughly 24 light-years across.',
      'Thousands of new stars are forming inside it.',
    ],
    stats: [
      { label: 'Catalog', value: 'M42' },
      { label: 'Distance', value: '1,344 ly' },
      { label: 'Diameter', value: '24 ly' },
      { label: 'Type', value: 'Emission nebula' },
    ],
    parentId: 'milky_way',
  },

  {
    id: 'eagle_nebula',
    name: 'Eagle Nebula',
    kind: 'nebula',
    color: '#9aa66b',
    emissive: true,
    tagline: 'M16 · home of the Pillars of Creation',
    description:
      'The Eagle Nebula (M16) is a young star cluster within a cloud of gas, famous for the towering "Pillars of Creation" imaged by Hubble.',
    facts: [
      'About 5,700 light-years away.',
      'Contains the Pillars of Creation.',
      'An active region of ongoing star birth.',
    ],
    stats: [
      { label: 'Catalog', value: 'M16' },
      { label: 'Distance', value: '5,700 ly' },
      { label: 'Diameter', value: '~70 ly' },
      { label: 'Type', value: 'Emission nebula' },
    ],
    parentId: 'milky_way',
  },
  {
    id: 'crab_nebula',
    name: 'Crab Nebula',
    kind: 'nebula',
    color: '#6bb5d5',
    emissive: true,
    tagline: 'M1 · supernova remnant with a pulsar',
    description:
      'The Crab Nebula (M1) is the expanding remnant of a supernova recorded in 1054 AD, powered by a rapidly spinning neutron star at its core.',
    facts: [
      'Its supernova was recorded by astronomers in 1054 AD.',
      'It expands at about 1,500 km/s.',
      'Its core is the Crab Pulsar, spinning 30 times a second.',
    ],
    stats: [
      { label: 'Catalog', value: 'M1' },
      { label: 'Distance', value: '6,500 ly' },
      { label: 'Diameter', value: '~11 ly' },
      { label: 'Type', value: 'Supernova remnant' },
    ],
    parentId: 'milky_way',
  },

  {
    id: 'vela_pulsar',
    name: 'Vela Pulsar',
    kind: 'pulsar',
    color: '#bfa9ff',
    emissive: true,
    tagline: 'Pulsar in the Vela supernova remnant',
    description:
      'The Vela Pulsar is a neutron star spinning about 11 times per second, the remnant of a supernova that exploded roughly 11,000 years ago.',
    facts: [
      'Spins about 11 times per second.',
      'Around 1,000 light-years away.',
      'One of the brightest gamma-ray sources in the sky.',
    ],
    stats: [
      { label: 'Spin', value: '11.2 Hz' },
      { label: 'Distance', value: '~1,000 ly' },
      { label: 'Age', value: '~11,000 yr' },
      { label: 'Type', value: 'Pulsar' },
    ],
    parentId: 'milky_way',
  },
  {
    id: 'psr_b1919',
    name: 'PSR B1919+21',
    kind: 'pulsar',
    color: '#a9c0ff',
    emissive: true,
    tagline: 'The first pulsar ever discovered',
    description:
      'PSR B1919+21 was the first pulsar discovered, found by Jocelyn Bell Burnell in 1967; its regular pulses were first nicknamed "LGM-1".',
    facts: [
      'Discovered in 1967.',
      'Pulses every 1.337 seconds.',
      'Its discovery confirmed that neutron stars exist.',
    ],
    stats: [
      { label: 'Period', value: '1.337 s' },
      { label: 'Distance', value: '~2,283 ly' },
      { label: 'Discovered', value: '1967' },
      { label: 'Type', value: 'Pulsar' },
    ],
    parentId: 'milky_way',
  },

  {
    id: 'rx_j1856',
    name: 'RX J1856.5−3754',
    kind: 'neutron_star',
    color: '#cfd8ff',
    emissive: true,
    tagline: 'Nearest known neutron star',
    description:
      'RX J1856.5−3754 is the closest known neutron star to Earth — an isolated, non-pulsing stellar remnant about 400 light-years away.',
    facts: [
      'About 400 light-years away.',
      'Only ~20 km across yet heavier than the Sun.',
      'Surface temperature near 700,000 °C.',
    ],
    stats: [
      { label: 'Diameter', value: '~20 km' },
      { label: 'Distance', value: '~400 ly' },
      { label: 'Temp', value: '~700,000 °C' },
      { label: 'Type', value: 'Neutron star' },
    ],
    parentId: 'milky_way',
  },
  {
    id: 'ton618',
    name: 'TON 618',
    kind: 'quasar',
    color: '#ffcf6b',
    emissive: true,
    tagline: 'Hyperluminous quasar · ultramassive black hole',
    description:
      'TON 618 is a hyperluminous quasar powered by one of the most massive black holes known — about 66 billion solar masses — over 10 billion light-years away.',
    facts: [
      'Around 10.4 billion light-years away.',
      'Its black hole is roughly 66 billion solar masses.',
      'It shines as bright as 140 trillion Suns.',
    ],
    stats: [
      { label: 'Type', value: 'Quasar' },
      { label: 'Distance', value: '10.4 Gly' },
      { label: 'BH mass', value: '~66B M☉' },
      { label: 'Luminosity', value: '140T ☉' },
    ],
    parentId: 'universe',
  },

  {
    id: 'm87_blackhole',
    name: 'M87*',
    kind: 'black_hole',
    color: '#160a26',
    tagline: 'First black hole ever imaged',
    description:
      'M87*, the supermassive black hole at the center of galaxy M87, became the first black hole ever directly imaged, in April 2019.',
    facts: [
      'About 6.5 billion solar masses.',
      'First imaged by the Event Horizon Telescope in 2019.',
      'Its shadow spans roughly the size of our Solar System.',
    ],
    stats: [
      { label: 'Type', value: 'Supermassive' },
      { label: 'Mass', value: '6.5B M☉' },
      { label: 'Imaged', value: '2019' },
      { label: 'Host', value: 'M87' },
    ],
    parentId: 'm87',
  },
];

export default deepSkyObjects;
