"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { useStore } from "zustand";

import { createAiCompanionStore, type AiCompanionStore } from "@/store/ai-companion-store";

type AiCompanionStoreApi = ReturnType<typeof createAiCompanionStore>;

const AiCompanionStoreContext = createContext<AiCompanionStoreApi | null>(null);

/**
 * Holds the AI Companion's conversation state (open/closed, message log).
 * Split from `StoreProvider` because this state is intentionally
 * session-only and unrelated to the visitor's journey preference — see
 * `ai-companion-store.ts`. The floating trigger/panel UI is built in a
 * later homepage phase; this provider only wires the state so that phase
 * can focus on the UI itself.
 */
export function AiCompanionStoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AiCompanionStoreApi | null>(null);
  storeRef.current ??= createAiCompanionStore();

  return (
    <AiCompanionStoreContext.Provider value={storeRef.current}>
      {children}
    </AiCompanionStoreContext.Provider>
  );
}

export function useAiCompanionStore<T>(selector: (store: AiCompanionStore) => T): T {
  const store = useContext(AiCompanionStoreContext);
  if (!store) {
    throw new Error("useAiCompanionStore must be used within AiCompanionStoreProvider");
  }
  return useStore(store, selector);
}
