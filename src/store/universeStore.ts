import { create } from 'zustand';

interface UniverseState {
  /** IDs of planets the user has opened at least once. */
  visited: string[];
  /** Experience points earned through exploration. */
  xp: number;
  visitPlanet: (id: string) => void;
  hasVisited: (id: string) => boolean;
  reset: () => void;
}

const XP_PER_VISIT = 10;

export const useUniverseStore = create<UniverseState>((set, get) => ({
  visited: [],
  xp: 0,
  visitPlanet: (id) =>
    set((state) => {
      if (state.visited.includes(id)) return state;
      return {
        visited: [...state.visited, id],
        xp: state.xp + XP_PER_VISIT,
      };
    }),
  hasVisited: (id) => get().visited.includes(id),
  reset: () => set({ visited: [], xp: 0 }),
}));

export default useUniverseStore;
