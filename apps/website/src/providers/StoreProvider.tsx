"use client";

import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import { useStore } from "zustand";

import { createAppStore, type AppStore } from "@/store/app-store";

type AppStoreApi = ReturnType<typeof createAppStore>;

const AppStoreContext = createContext<AppStoreApi | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStoreApi | null>(null);
  storeRef.current ??= createAppStore();

  // Rehydrating after mount (rather than during store creation) keeps the
  // first client render identical to the server-rendered markup, then
  // applies the persisted journey/intro state — no hydration mismatch.
  useEffect(() => {
    void storeRef.current?.persist.rehydrate();
  }, []);

  return <AppStoreContext.Provider value={storeRef.current}>{children}</AppStoreContext.Provider>;
}

export function useAppStore<T>(selector: (store: AppStore) => T): T {
  const store = useContext(AppStoreContext);
  if (!store) {
    throw new Error("useAppStore must be used within StoreProvider");
  }
  return useStore(store, selector);
}
