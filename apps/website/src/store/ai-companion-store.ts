import { createStore } from "zustand/vanilla";

export interface AiMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  /** Suggested follow-ups rendered as chips under an assistant message. */
  quickReplies?: string[];
}

export interface AiCompanionState {
  isOpen: boolean;
  messages: AiMessage[];
}

export interface AiCompanionActions {
  open: () => void;
  close: () => void;
  toggle: () => void;
  addMessage: (message: AiMessage) => void;
  clearConversation: () => void;
}

export type AiCompanionStore = AiCompanionState & AiCompanionActions;

export const defaultAiCompanionState: AiCompanionState = {
  isOpen: false,
  messages: [],
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
  }));
}
