import { createStore } from "zustand/vanilla";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";

import type { Journey } from "@/types/journey";

export interface AppState {
  journey: Journey | null;
  /** Drives the Arrival Experience's returning-visitor detection (CLAUDE.md Part 9: "Returning visitors -> 0 seconds"). */
  hasSeenIntro: boolean;
  /** Knowledge Center article slugs a visitor has bookmarked (CLAUDE.md Part 18: "Bookmarking"). */
  bookmarkedArticleSlugs: string[];
  /** Knowledge Center article slugs a visitor has marked complete within a Learning Path (CLAUDE.md Part 18: Learning Paths' "progress, completion"). */
  completedArticleSlugs: string[];
  /** Checked-off playbook checklist items, id'd as `${playbookSlug}:${stepId}:${itemIndex}` (CLAUDE.md Part 18/19: Playbooks' "Checklists"). Flat, like `bookmarkedArticleSlugs`, rather than nested per playbook — the composite id is already unique and avoids a second normalization shape for the same kind of data. */
  checkedPlaybookItemIds: string[];
  /** Last known scroll percentage (0-100) per article slug, written once on unmount rather than on every scroll tick (CLAUDE.md Part 18/23: Reading Experience's "Allow visitors to return to where they stopped"). */
  readingProgressBySlug: Record<string, number>;
}

export interface AppActions {
  setJourney: (journey: Journey | null) => void;
  markIntroSeen: () => void;
  toggleBookmark: (slug: string) => void;
  toggleArticleCompleted: (slug: string) => void;
  toggleChecklistItem: (itemId: string) => void;
  setReadingProgress: (slug: string, percent: number) => void;
}

export type AppStore = AppState & AppActions;

export const defaultAppState: AppState = {
  journey: null,
  hasSeenIntro: false,
  bookmarkedArticleSlugs: [],
  completedArticleSlugs: [],
  checkedPlaybookItemIds: [],
  readingProgressBySlug: {},
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
        toggleBookmark: (slug) =>
          set((state) => ({
            bookmarkedArticleSlugs: state.bookmarkedArticleSlugs.includes(slug)
              ? state.bookmarkedArticleSlugs.filter((candidate) => candidate !== slug)
              : [...state.bookmarkedArticleSlugs, slug],
          })),
        toggleArticleCompleted: (slug) =>
          set((state) => ({
            completedArticleSlugs: state.completedArticleSlugs.includes(slug)
              ? state.completedArticleSlugs.filter((candidate) => candidate !== slug)
              : [...state.completedArticleSlugs, slug],
          })),
        toggleChecklistItem: (itemId) =>
          set((state) => ({
            checkedPlaybookItemIds: state.checkedPlaybookItemIds.includes(itemId)
              ? state.checkedPlaybookItemIds.filter((candidate) => candidate !== itemId)
              : [...state.checkedPlaybookItemIds, itemId],
          })),
        setReadingProgress: (slug, percent) =>
          set((state) => ({
            readingProgressBySlug: { ...state.readingProgressBySlug, [slug]: percent },
          })),
      }),
      {
        name: "byld-iq-app-store",
        storage: createJSONStorage(() => createSafeStorage()),
        partialize: (state) => ({
          journey: state.journey,
          hasSeenIntro: state.hasSeenIntro,
          bookmarkedArticleSlugs: state.bookmarkedArticleSlugs,
          completedArticleSlugs: state.completedArticleSlugs,
          checkedPlaybookItemIds: state.checkedPlaybookItemIds,
          readingProgressBySlug: state.readingProgressBySlug,
        }),
        skipHydration: true,
      },
    ),
  );
}
