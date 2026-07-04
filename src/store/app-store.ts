import { createStore } from "zustand/vanilla";

import type { Journey } from "@/types/journey";

export interface AppState {
  journey: Journey | null;
}

export interface AppActions {
  setJourney: (journey: Journey | null) => void;
}

export type AppStore = AppState & AppActions;

export const defaultAppState: AppState = {
  journey: null,
};

/**
 * Factory rather than a module-level singleton: Next.js App Router can
 * render multiple requests concurrently on the server, and a shared store
 * instance would leak state between them. `StoreProvider` creates one store
 * per component tree via this factory.
 */
export function createAppStore(initState: AppState = defaultAppState) {
  return createStore<AppStore>()((set) => ({
    ...initState,
    setJourney: (journey) => set({ journey }),
  }));
}
