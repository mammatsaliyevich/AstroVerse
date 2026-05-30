import { Planet } from '../types/celestial';

export type Difficulty = 'beginner' | 'student' | 'expert';

/**
 * Local, offline AI-style guide. Produces a layered explanation from the
 * planet's own data. Swap this implementation for a real LLM call later
 * (see EXPO_PUBLIC_OPENAI_API_KEY in .env.example).
 */
export function generateAnswer(
  question: string,
  difficulty: Difficulty,
  planet?: Planet
): string {
  const q = question.trim().toLowerCase();

  if (planet) {
    if (q.includes('temperature') || q.includes('hot') || q.includes('cold')) {
      return layer(
        `${planet.name} has an average temperature of about ${planet.avgTempC}°C.`,
        `That value comes from its distance of ${planet.distanceFromSunAu} AU from the Sun and its atmosphere.`,
        `Energy balance depends on solar flux (~1/d²), albedo, and greenhouse forcing - which is why ${planet.name} differs from Earth.`,
        difficulty
      );
    }
    if (q.includes('gravity') || q.includes('weight')) {
      return layer(
        `Gravity on ${planet.name} is ${planet.gravity} m/s².`,
        `You would feel ${(planet.gravity / 9.807).toFixed(2)}x your Earth weight there.`,
        `Surface gravity g = GM/r² with M=${planet.massKg.toExponential(2)} kg and r=${planet.radiusKm} km.`,
        difficulty
      );
    }
    if (q.includes('day') || q.includes('year') || q.includes('orbit')) {
      return layer(
        `A day on ${planet.name} lasts ${planet.dayLengthHours} hours and a year ${planet.yearLengthDays} Earth days.`,
        `Day length is set by rotation; year length by its orbit at ${planet.distanceFromSunAu} AU.`,
        `By Kepler's third law, orbital period scales with semi-major axis as T ∝ a^1.5.`,
        difficulty
      );
    }
    return layer(
      `${planet.name}: ${planet.description}`,
      `${planet.facts[0] ?? ''}`,
      `${planet.facts.join(' ')}`,
      difficulty
    );
  }

  return layer(
    'Pick a planet to explore, then ask me anything about it!',
    'I can explain temperature, gravity, orbits, atmospheres and more.',
    'Choose Beginner, Student, or Expert mode to tune the depth of each answer.',
    difficulty
  );
}

function layer(
  beginner: string,
  student: string,
  expert: string,
  difficulty: Difficulty
): string {
  if (difficulty === 'beginner') return beginner;
  if (difficulty === 'student') return `${beginner} ${student}`;
  return `${beginner} ${student} ${expert}`;
}

export default generateAnswer;
