import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ROOT_ID, getNode, getChildren } from '../engine/hierarchy';
import { CameraState, CameraTransition, HistoryEntry } from '../engine/types';
import { computeCameraForNode, TRANSITION_MS } from '../engine/camera';

const HISTORY_LIMIT = 50;
const rootCamera = computeCameraForNode(getNode(ROOT_ID)!);

interface NavigationState {
  /** Currently focused node id. */
  focusId: string;
  /** Target camera state (renderer interpolates toward this). */
  camera: CameraState;
  /** Active travel transition, or null when idle. */
  transition: CameraTransition | null;
  isTransitioning: boolean;
  /** Back/forward stacks for in-session navigation. */
  backStack: string[];
  forwardStack: string[];
  /** Persisted chronological exploration log. */
  history: HistoryEntry[];

  focusNode: (id: string) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  back: () => void;
  forward: () => void;
  endTransition: () => void;
  reset: () => void;
}

/** Builds a transition + camera target for travelling to `toId`. */
function travelTo(fromId: string, fromCamera: CameraState, toId: string) {
  const node = getNode(toId)!;
  const to = computeCameraForNode(node);
  const transition: CameraTransition = {
    fromId,
    toId,
    from: fromCamera,
    to,
    startedAt: Date.now(),
    durationMs: TRANSITION_MS,
  };
  return { to, transition };
}


export const useNavigationStore = create<NavigationState>()(
  persist(
    (set, get) => ({
      focusId: ROOT_ID,
      camera: rootCamera,
      transition: null,
      isTransitioning: false,
      backStack: [],
      forwardStack: [],
      history: [],

      focusNode: (id) => {
        const state = get();
        if (id === state.focusId || !getNode(id)) return;
        const { to, transition } = travelTo(state.focusId, state.camera, id);
        const last = state.history[state.history.length - 1];
        const history =
          last?.nodeId === id
            ? state.history
            : [...state.history, { nodeId: id, at: Date.now() }].slice(-HISTORY_LIMIT);
        set({
          focusId: id,
          camera: to,
          transition,
          isTransitioning: true,
          backStack: [...state.backStack, state.focusId],
          forwardStack: [],
          history,
        });
      },

      zoomIn: () => {
        const children = getChildren(get().focusId);
        if (children.length > 0) get().focusNode(children[0].id);
      },

      zoomOut: () => {
        const node = getNode(get().focusId);
        if (node?.parentId) get().focusNode(node.parentId);
      },


      back: () => {
        const state = get();
        const prev = state.backStack[state.backStack.length - 1];
        if (!prev) return;
        const { to, transition } = travelTo(state.focusId, state.camera, prev);
        set({
          focusId: prev,
          camera: to,
          transition,
          isTransitioning: true,
          backStack: state.backStack.slice(0, -1),
          forwardStack: [...state.forwardStack, state.focusId],
        });
      },

      forward: () => {
        const state = get();
        const next = state.forwardStack[state.forwardStack.length - 1];
        if (!next) return;
        const { to, transition } = travelTo(state.focusId, state.camera, next);
        set({
          focusId: next,
          camera: to,
          transition,
          isTransitioning: true,
          forwardStack: state.forwardStack.slice(0, -1),
          backStack: [...state.backStack, state.focusId],
        });
      },

      endTransition: () => set({ isTransitioning: false, transition: null }),

      reset: () =>
        set({
          focusId: ROOT_ID,
          camera: rootCamera,
          transition: null,
          isTransitioning: false,
          backStack: [],
          forwardStack: [],
        }),
    }),
    {
      name: 'astroverse-navigation',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({ history: s.history }),
    }
  )
);

export default useNavigationStore;
