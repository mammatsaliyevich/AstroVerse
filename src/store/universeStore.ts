import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressSnapshot } from '../data/achievements';
import { evaluateUnlocks, levelForXp, LevelInfo } from '../services/progression';

const XP_PER_VISIT = 10;

interface UniverseState {
  /** IDs of planets the user has opened at least once. */
  visited: string[];
  /** IDs of planets the user has favorited. */
  favorites: string[];
  /** IDs of unlocked achievements. */
  unlockedAchievements: string[];
  /** Experience points earned through exploration. */
  xp: number;
  /** IDs unlocked during the most recent action (for surfacing toasts/UI). */
  recentUnlocks: string[];

  // Actions
  visitPlanet: (id: string) => void;
  toggleFavorite: (id: string) => void;
  hasVisited: (id: string) => boolean;
  isFavorite: (id: string) => boolean;
  getLevel: () => LevelInfo;
  clearRecentUnlocks: () => void;
  reset: () => void;
}

/**
 * Applies cascading achievement unlocks against a snapshot. XP rewards from a
 * newly unlocked achievement may satisfy an XP-threshold achievement, so we
 * iterate to a fixpoint (bounded by the number of achievements).
 */
function resolveUnlocks(snapshot: ProgressSnapshot, alreadyUnlocked: string[]) {
  let xp = snapshot.xp;
  let unlocked = [...alreadyUnlocked];
  const newlyUnlocked: string[] = [];

  for (;;) {
    const newly = evaluateUnlocks({ ...snapshot, xp }, unlocked);
    if (newly.length === 0) break;
    unlocked = [...unlocked, ...newly.map((a) => a.id)];
    newlyUnlocked.push(...newly.map((a) => a.id));
    xp += newly.reduce((sum, a) => sum + a.xpReward, 0);
  }

  return { xp, unlockedAchievements: unlocked, newlyUnlocked };
}


export const useUniverseStore = create<UniverseState>()(
  persist(
    (set, get) => ({
      visited: [],
      favorites: [],
      unlockedAchievements: [],
      xp: 0,
      recentUnlocks: [],

      visitPlanet: (id) =>
        set((state) => {
          if (state.visited.includes(id)) return state;
          const visited = [...state.visited, id];
          const snapshot: ProgressSnapshot = {
            visited,
            favorites: state.favorites,
            xp: state.xp + XP_PER_VISIT,
          };
          const res = resolveUnlocks(snapshot, state.unlockedAchievements);
          return {
            visited,
            xp: res.xp,
            unlockedAchievements: res.unlockedAchievements,
            recentUnlocks: res.newlyUnlocked,
          };
        }),

      toggleFavorite: (id) =>
        set((state) => {
          const favorites = state.favorites.includes(id)
            ? state.favorites.filter((f) => f !== id)
            : [...state.favorites, id];
          const snapshot: ProgressSnapshot = {
            visited: state.visited,
            favorites,
            xp: state.xp,
          };
          const res = resolveUnlocks(snapshot, state.unlockedAchievements);
          return {
            favorites,
            xp: res.xp,
            unlockedAchievements: res.unlockedAchievements,
            recentUnlocks: res.newlyUnlocked,
          };
        }),

      hasVisited: (id) => get().visited.includes(id),
      isFavorite: (id) => get().favorites.includes(id),
      getLevel: () => levelForXp(get().xp),
      clearRecentUnlocks: () => set({ recentUnlocks: [] }),
      reset: () =>
        set({
          visited: [],
          favorites: [],
          unlockedAchievements: [],
          xp: 0,
          recentUnlocks: [],
        }),
    }),
    {
      name: 'astroverse-progress',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({
        visited: s.visited,
        favorites: s.favorites,
        unlockedAchievements: s.unlockedAchievements,
        xp: s.xp,
      }),
    }
  )
);

export default useUniverseStore;
