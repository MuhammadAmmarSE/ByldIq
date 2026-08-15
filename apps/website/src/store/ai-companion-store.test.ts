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

  it("defaults pageContext to null and can set/clear it", () => {
    const store = createAiCompanionStore();
    expect(store.getState().pageContext).toBeNull();

    store.getState().setPageContext({ label: "Startup Product Engineering", slug: "startup" });
    expect(store.getState().pageContext).toEqual({
      label: "Startup Product Engineering",
      slug: "startup",
    });

    store.getState().setPageContext(null);
    expect(store.getState().pageContext).toBeNull();
  });

  it("creates independent instances per call", () => {
    const storeA = createAiCompanionStore();
    const storeB = createAiCompanionStore();
    storeA.getState().open();
    expect(storeB.getState().isOpen).toBe(false);
  });

  it("defaults currentSection to null and can set/clear it", () => {
    const store = createAiCompanionStore();
    expect(store.getState().currentSection).toBeNull();

    store.getState().setCurrentSection("technology-ecosystem");
    expect(store.getState().currentSection).toBe("technology-ecosystem");

    store.getState().setCurrentSection(null);
    expect(store.getState().currentSection).toBeNull();
  });

  it("records recently viewed pages via setPageContext, most-recent-first, deduplicated by slug", () => {
    const store = createAiCompanionStore();

    store.getState().setPageContext({ label: "Startup Product Engineering", slug: "startup" });
    store.getState().setPageContext({ label: "Next.js", slug: "next-js" });
    expect(store.getState().recentlyViewed.map((entry) => entry.slug)).toEqual([
      "next-js",
      "startup",
    ]);

    // Revisiting an earlier page moves it back to the front instead of duplicating it.
    store.getState().setPageContext({ label: "Startup Product Engineering", slug: "startup" });
    expect(store.getState().recentlyViewed.map((entry) => entry.slug)).toEqual([
      "startup",
      "next-js",
    ]);

    // Clearing the page context (leaving a page) doesn't erase the history.
    store.getState().setPageContext(null);
    expect(store.getState().pageContext).toBeNull();
    expect(store.getState().recentlyViewed.map((entry) => entry.slug)).toEqual([
      "startup",
      "next-js",
    ]);
  });

  it("caps recentlyViewed at the context history limit", () => {
    const store = createAiCompanionStore();
    for (const slug of ["a", "b", "c", "d"]) {
      store.getState().setPageContext({ label: slug, slug });
    }
    expect(store.getState().recentlyViewed.map((entry) => entry.slug)).toEqual(["d", "c", "b"]);
  });

  it("records CTA interactions most-recent-first, capped at the context history limit", () => {
    const store = createAiCompanionStore();
    store.getState().recordCtaInteraction("Build My Product Roadmap");
    store.getState().recordCtaInteraction("Talk to Byld");
    store.getState().recordCtaInteraction("Book Discovery");
    store.getState().recordCtaInteraction("Explore Knowledge");

    expect(store.getState().ctaHistory).toEqual([
      "Explore Knowledge",
      "Book Discovery",
      "Talk to Byld",
    ]);
  });
});
