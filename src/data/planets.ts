import { Planet } from '../types/celestial';

/**
 * Scientific data for the eight planets of the Solar System.
 * Sources: NASA planetary fact sheets (rounded for display).
 */
export const planets: Planet[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    type: 'planet',
    color: '#8c7853',
    radiusKm: 2439.7,
    massKg: 3.3011e23,
    gravity: 3.7,
    dayLengthHours: 4222.6,
    yearLengthDays: 88,
    distanceFromSunAu: 0.39,
    moons: 0,
    avgTempC: 167,
    description:
      'The smallest planet and the closest to the Sun, with no atmosphere to retain heat.',
    facts: [
      'A day on Mercury lasts about 176 Earth days.',
      'Surface temperatures swing from -173°C to 427°C.',
      'It has no moons and no rings.',
    ],
  },
  {
    id: 'venus',
    name: 'Venus',
    type: 'planet',
    color: '#ffc649',
    radiusKm: 6051.8,
    massKg: 4.8675e24,
    gravity: 8.87,
    dayLengthHours: 2802,
    yearLengthDays: 225,
    distanceFromSunAu: 0.72,
    moons: 0,
    avgTempC: 464,
    description:
      'The hottest planet, wrapped in a thick carbon-dioxide atmosphere and sulfuric-acid clouds.',
    facts: [
      'Venus spins backwards compared with most planets.',
      'A day on Venus is longer than its year.',
      'Surface pressure is about 92 times that of Earth.',
    ],
  },

  {
    id: 'earth',
    name: 'Earth',
    type: 'planet',
    color: '#4a90e2',
    radiusKm: 6371,
    massKg: 5.97237e24,
    gravity: 9.807,
    dayLengthHours: 24,
    yearLengthDays: 365.25,
    distanceFromSunAu: 1,
    moons: 1,
    avgTempC: 15,
    description:
      'Our home world - the only place known to harbor life, with liquid water and a breathable atmosphere.',
    facts: [
      '71% of the surface is covered by water.',
      'The atmosphere is 78% nitrogen and 21% oxygen.',
      'Earth is about 4.5 billion years old.',
    ],
  },
  {
    id: 'mars',
    name: 'Mars',
    type: 'planet',
    color: '#cd5c5c',
    radiusKm: 3389.5,
    massKg: 6.4171e23,
    gravity: 3.721,
    dayLengthHours: 24.6,
    yearLengthDays: 687,
    distanceFromSunAu: 1.52,
    moons: 2,
    avgTempC: -63,
    description:
      'The Red Planet, home to the largest volcano and canyon in the Solar System.',
    facts: [
      'Iron oxide (rust) gives Mars its red color.',
      'Olympus Mons is the tallest volcano in the Solar System.',
      'Valles Marineris is over 4,000 km long.',
    ],
  },

  {
    id: 'jupiter',
    name: 'Jupiter',
    type: 'planet',
    color: '#c88b3a',
    radiusKm: 69911,
    massKg: 1.8982e27,
    gravity: 24.79,
    dayLengthHours: 9.9,
    yearLengthDays: 4333,
    distanceFromSunAu: 5.2,
    moons: 95,
    avgTempC: -110,
    description:
      'The largest planet, a gas giant whose Great Red Spot is a storm bigger than Earth.',
    facts: [
      'Jupiter is more massive than all other planets combined.',
      'The Great Red Spot has raged for centuries.',
      'It has at least 95 known moons.',
    ],
  },
  {
    id: 'saturn',
    name: 'Saturn',
    type: 'planet',
    color: '#fad5a5',
    radiusKm: 58232,
    massKg: 5.6834e26,
    gravity: 10.44,
    dayLengthHours: 10.7,
    yearLengthDays: 10759,
    distanceFromSunAu: 9.5,
    moons: 146,
    avgTempC: -140,
    description:
      'Famous for its spectacular ring system and the lowest density of any planet.',
    facts: [
      'Saturn is less dense than water.',
      'Its rings are made of ice and rock.',
      'It has 146 known moons, including Titan.',
    ],
  },

  {
    id: 'uranus',
    name: 'Uranus',
    type: 'planet',
    color: '#4fd0e7',
    radiusKm: 25362,
    massKg: 8.681e25,
    gravity: 8.69,
    dayLengthHours: 17.2,
    yearLengthDays: 30687,
    distanceFromSunAu: 19.2,
    moons: 27,
    avgTempC: -195,
    description:
      'An ice giant that rotates on its side, giving it the most extreme seasons in the Solar System.',
    facts: [
      'Uranus is tilted about 98 degrees on its axis.',
      'It has the coldest planetary atmosphere.',
      'It was the first planet found with a telescope (1781).',
    ],
  },
  {
    id: 'neptune',
    name: 'Neptune',
    type: 'planet',
    color: '#4166f5',
    radiusKm: 24622,
    massKg: 1.02413e26,
    gravity: 11.15,
    dayLengthHours: 16.1,
    yearLengthDays: 60190,
    distanceFromSunAu: 30.1,
    moons: 14,
    avgTempC: -200,
    description:
      'The windiest planet, a deep-blue ice giant discovered through mathematics before observation.',
    facts: [
      'Winds reach up to 2,100 km/h.',
      'Methane gives Neptune its blue color.',
      'It takes 165 Earth years to orbit the Sun.',
    ],
  },
];

export const getPlanetById = (id: string): Planet | undefined =>
  planets.find((p) => p.id === id);

export default planets;
