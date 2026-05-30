import {
  achievements,
  Achievement,
  ProgressSnapshot,
} from '../data/achievements';

/**
 * Progression rules for AstroVerse: the XP -> level curve and the
 * achievement-unlock evaluator. Pure functions only, so they can be unit
 * tested and reused by the store without side effects.
 */

export interface LevelInfo {
  level: number;
  /** XP accumulated within the current level. */
  currentLevelXp: number;
  /** XP required to advance from the current level to the next. */
  nextLevelXp: number;
  /** Fractional progress through the current level (0..1). */
  progress: number;
  /** Total lifetime XP. */
  totalXp: number;
}

/** XP required to reach level 2; each subsequent level costs XP_STEP more. */
const BASE_XP = 100;
const XP_STEP = 50;

export function levelForXp(xp: number): LevelInfo {
  let level = 1;
  let need = BASE_XP;
  let remaining = Math.max(0, Math.floor(xp));

  while (remaining >= need) {
    remaining -= need;
    level += 1;
    need += XP_STEP;
  }

  return {
    level,
    currentLevelXp: remaining,
    nextLevelXp: need,
    progress: need > 0 ? remaining / need : 0,
    totalXp: Math.max(0, Math.floor(xp)),
  };
}

/** Returns achievements newly satisfied by the snapshot but not yet unlocked. */
export function evaluateUnlocks(
  snapshot: ProgressSnapshot,
  alreadyUnlocked: string[]
): Achievement[] {
  return achievements.filter(
    (a) => !alreadyUnlocked.includes(a.id) && a.check(snapshot)
  );
}
