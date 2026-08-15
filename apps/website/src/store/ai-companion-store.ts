import { createStore } from "zustand/vanilla";

export interface AiMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  /** Suggested follow-ups rendered as chips under an assistant message. */
  quickReplies?: string[];
}

/** What page the visitor is currently viewing, for a more specific greeting than the journey alone (CLAUDE.md Part 16: "Byld always understands: Current page... Current solution"). */
export interface AiPageContext {
  label: string;
  slug: string;
}

/** How many entries `recentlyViewed`/`ctaHistory` keep — recent context only, not a full session log. */
const CONTEXT_HISTORY_LIMIT = 3;

export interface AiCompanionState {
  isOpen: boolean;
  messages: AiMessage[];
  pageContext: AiPageContext | null;
  /** The homepage section currently in view (`HomepageSection`'s `id`), for a greeting more specific than "default" when no `pageContext` is set. Never cleared on scroll-out — the next section's own intersection overwrites it, so there's always a "last known" section instead of flickering to null mid-scroll. */
  currentSection: string | null;
  /** Most-recent-first, deduplicated by slug, capped at `CONTEXT_HISTORY_LIMIT` — every `setPageContext` call (Solution/Technology/Case Study/Knowledge detail pages) also records here, so the AI can reference what a visitor looked at even after navigating away. */
  recentlyViewed: AiPageContext[];
  /** Most-recent-first, capped at `CONTEXT_HISTORY_LIMIT` — a short label per CTA, recorded from a few of the site's most meaningful CTAs (hero, conversion decision cards), not every clickable element. */
  ctaHistory: string[];
}

export interface AiCompanionActions {
  open: () => void;
  close: () => void;
  toggle: () => void;
  addMessage: (message: AiMessage) => void;
  clearConversation: () => void;
  setPageContext: (context: AiPageContext | null) => void;
  setCurrentSection: (section: string | null) => void;
  recordCtaInteraction: (label: string) => void;
}

export type AiCompanionStore = AiCompanionState & AiCompanionActions;

export const defaultAiCompanionState: AiCompanionState = {
  isOpen: false,
  messages: [],
  pageContext: null,
  currentSection: null,
  recentlyViewed: [],
  ctaHistory: [],
};

/**
 * Factory rather than a module-level singleton, for the same SSR-safety
 * reason as `createAppStore`. Deliberately in-memory only — CLAUDE.md Part
 * 16: "Session memory by default" and "never sent to a server." Unlike the
 * journey preference in `app-store.ts`, conversation history should not
 * survive a reload; closing or refreshing the tab is the visitor's implicit
 * "clear my conversation."
 */
export function createAiCompanionStore(initState: AiCompanionState = defaultAiCompanionState) {
  return createStore<AiCompanionStore>()((set) => ({
    ...initState,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
    clearConversation: () => set({ messages: [] }),
    setPageContext: (context) =>
      set((state) => {
        if (!context) return { pageContext: null };
        const withoutDuplicate = state.recentlyViewed.filter(
          (entry) => entry.slug !== context.slug,
        );
        return {
          pageContext: context,
          recentlyViewed: [context, ...withoutDuplicate].slice(0, CONTEXT_HISTORY_LIMIT),
        };
      }),
    setCurrentSection: (section) => set({ currentSection: section }),
    recordCtaInteraction: (label) =>
      set((state) => ({
        ctaHistory: [label, ...state.ctaHistory].slice(0, CONTEXT_HISTORY_LIMIT),
      })),
  }));
}
