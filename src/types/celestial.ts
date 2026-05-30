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
