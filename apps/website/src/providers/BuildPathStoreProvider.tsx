"use client";

import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import { useStore } from "zustand";

import { createBuildPathStore, type BuildPathStore } from "@/store/buildpath-store";

type BuildPathStoreApi = ReturnType<typeof createBuildPathStore>;

const BuildPathStoreContext = createContext<BuildPathStoreApi | null>(null);

export function BuildPathStoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<BuildPathStoreApi | null>(null);
  storeRef.current ??= createBuildPathStore();

  // Same rehydrate-after-mount pattern as StoreProvider — keeps the first
  // client render identical to the server-rendered markup, then restores
  // the visitor's in-progress plan. No hydration mismatch. `hasHydrated`
  // lets consumers (BuildPathShell) wait for this to finish before
  // deciding whether a session is genuinely fresh — without it, entry
  // context would race the async rehydrate and misfire on every reload.
  useEffect(() => {
    void Promise.resolve(storeRef.current?.persist.rehydrate()).then(() => {
      storeRef.current?.getState().setHasHydrated(true);
    });
  }, []);

  return (
    <BuildPathStoreContext.Provider value={storeRef.current}>
      {children}
    </BuildPathStoreContext.Provider>
  );
}

export function useBuildPathStore<T>(selector: (store: BuildPathStore) => T): T {
  const store = useContext(BuildPathStoreContext);
  if (!store) {
    throw new Error("useBuildPathStore must be used within BuildPathStoreProvider");
  }
  return useStore(store, selector);
}
