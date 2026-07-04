import { describe, expect, it } from "vitest";

import { createAiCompanionStore } from "@/store/ai-companion-store";

describe("createAiCompanionStore", () => {
  it("defaults to closed with no messages", () => {
    const store = createAiCompanionStore();
    expect(store.getState().isOpen).toBe(false);
    expect(store.getState().messages).toEqual([]);
  });

  it("opens, closes, and toggles", () => {
    const store = createAiCompanionStore();
    store.getState().open();
    expect(store.getState().isOpen).toBe(true);
    store.getState().close();
    expect(store.getState().isOpen).toBe(false);
    store.getState().toggle();
    expect(store.getState().isOpen).toBe(true);
  });

  it("appends messages and preserves order", () => {
    const store = createAiCompanionStore();
    store.getState().addMessage({ id: "1", role: "assistant", content: "Hi" });
    store.getState().addMessage({ id: "2", role: "user", content: "Hello" });
    expect(store.getState().messages.map((m) => m.id)).toEqual(["1", "2"]);
  });

  it("clears the conversation", () => {
    const store = createAiCompanionStore();
    store.getState().addMessage({ id: "1", role: "assistant", content: "Hi" });
    store.getState().clearConversation();
    expect(store.getState().messages).toEqual([]);
  });

  it("creates independent instances per call", () => {
    const storeA = createAiCompanionStore();
    const storeB = createAiCompanionStore();
    storeA.getState().open();
    expect(storeB.getState().isOpen).toBe(false);
  });
});
