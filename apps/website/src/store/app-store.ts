import { createStore } from "zustand/vanilla";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";

import type { Journey } from "@/types/journey";

export interface AppState {
  journey: Journey | null;
  /** Drives the Arrival Experience's returning-visitor detection (CLAUDE.md Part 9: "Returning visitors -> 0 seconds"). */
  hasSeenIntro: boolean;
}

export interface AppActions {
  setJourney: (journey: Journey | null) => void;
  markIntroSeen: () => void;
}

export type AppStore = AppState & AppActions;

export const defaultAppState: AppState = {
  journey: null,
  hasSeenIntro: false,
};

/**
 * Falls back to an in-memory map when `localStorage` throws (private
 * browsing, storage quota, disabled storage) — CLAUDE.md Part 10: "Storage
 * blocked -> Session memory." The visitor's choice still works for the
 * current tab; it just doesn't survive a reload.
 */
function createSafeStorage(): StateStorage {
  const memory = new Map<string, string>();
  return {
    getItem: (name) => {
      try {
        return localStorage.getItem(name);
      } catch {
        return memory.get(name) ?? null;
      }
    },
    setItem: (name, value) => {
      try {
        localStorage.setItem(name, value);
      } catch {
        memory.set(name, value);
      }
    },
    removeItem: (name) => {
      try {
        localStorage.removeItem(name);
      } catch {
        memory.delete(name);
      }
    },
  };
}

/**
 * Factory rather than a module-level singleton: Next.js App Router can
 * render multiple requests concurrently on the server, and a shared store
 * instance would leak state between them. `StoreProvider` creates one store
 * per component tree via this factory.
 *
 * `journey` and `hasSeenIntro` persist across visits (Part 10: "Preference
 * should persist across visits until changed"). Hydration is skipped here
 * and driven manually by `StoreProvider` after mount, since `localStorage`
 * doesn't exist during SSR and reading it synchronously during store
 * creation would desync the server-rendered markup from the client.
 */
export function createAppStore(initState: AppState = defaultAppState) {
  return createStore<AppStore>()(
    persist(
      (set) => ({
        ...initState,
        setJourney: (journey) => set({ journey }),
        markIntroSeen: () => set({ hasSeenIntro: true }),
      }),
      {
        name: "byld-iq-app-store",
        storage: createJSONStorage(() => createSafeStorage()),
        partialize: (state) => ({ journey: state.journey, hasSeenIntro: state.hasSeenIntro }),
        skipHydration: true,
      },
    ),
  );
}
