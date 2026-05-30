/**
 * Achievement catalog and the progress snapshot they are evaluated against.
 * Definitions live in the data layer; evaluation logic lives in
 * src/services/progression.ts. Keeping `check` here is fine because the
 * store never persists Achievement objects (only their ids).
 */

export interface ProgressSnapshot {
  /** Planet ids the user has opened at least once. */
  visited: string[];
  /** Planet ids the user has favorited. */
  favorites: string[];
  /** Total experience points earned. */
  xp: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  /** Emoji used as the badge icon. */
  icon: string;
  /** XP granted when the achievement unlocks. Use 0 for XP-threshold badges. */
  xpReward: number;
  /** Predicate evaluated against the current progress snapshot. */
  check: (p: ProgressSnapshot) => boolean;
}

export const achievements: Achievement[] = [
  {
    id: 'first_step',
    title: 'First Step',
    description: 'Visit your first planet.',
    icon: '🚀',
    xpReward: 20,
    check: (p) => p.visited.length >= 1,
  },
  {
    id: 'wanderer',
    title: 'Wanderer',
    description: 'Visit four different planets.',
    icon: '🛰️',
    xpReward: 40,
    check: (p) => p.visited.length >= 4,
  },

  {
    id: 'grand_tour',
    title: 'Grand Tour',
    description: 'Visit all eight planets of the Solar System.',
    icon: '🌌',
    xpReward: 100,
    check: (p) => p.visited.length >= 8,
  },
  {
    id: 'curator',
    title: 'Curator',
    description: 'Add three planets to your favorites.',
    icon: '⭐',
    xpReward: 30,
    check: (p) => p.favorites.length >= 3,
  },
  {
    id: 'rising_star',
    title: 'Rising Star',
    description: 'Earn 100 total experience points.',
    icon: '✨',
    xpReward: 0,
    check: (p) => p.xp >= 100,
  },
  {
    id: 'cosmic_scholar',
    title: 'Cosmic Scholar',
    description: 'Earn 250 total experience points.',
    icon: '🎓',
    xpReward: 0,
    check: (p) => p.xp >= 250,
  },
];

export const getAchievementById = (id: string): Achievement | undefined =>
  achievements.find((a) => a.id === id);

export default achievements;
