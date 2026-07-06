import { beforeEach, describe, expect, it } from "vitest";

import { createAppStore } from "@/store/app-store";

describe("createAppStore", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("defaults journey to null and intro unseen", () => {
    const store = createAppStore();
    expect(store.getState().journey).toBeNull();
    expect(store.getState().hasSeenIntro).toBe(false);
  });

  it("updates journey via setJourney", () => {
    const store = createAppStore();
    store.getState().setJourney("startup");
    expect(store.getState().journey).toBe("startup");
  });

  it("marks the intro as seen via markIntroSeen", () => {
    const store = createAppStore();
    store.getState().markIntroSeen();
    expect(store.getState().hasSeenIntro).toBe(true);
  });

  it("creates independent instances per call", () => {
    const storeA = createAppStore();
    const storeB = createAppStore();
    storeA.getState().setJourney("enterprise");
    expect(storeB.getState().journey).toBeNull();
  });

  it("persists journey and intro state to storage after rehydration", async () => {
    const storeA = createAppStore();
    storeA.getState().setJourney("commerce");
    storeA.getState().markIntroSeen();

    const storeB = createAppStore();
    await storeB.persist.rehydrate();

    expect(storeB.getState().journey).toBe("commerce");
    expect(storeB.getState().hasSeenIntro).toBe(true);
  });

  it("does not hydrate automatically (skipHydration)", () => {
    const storeA = createAppStore();
    storeA.getState().setJourney("ai");

    const storeB = createAppStore();
    expect(storeB.getState().journey).toBeNull();
  });

  it("defaults bookmarkedArticleSlugs to empty", () => {
    const store = createAppStore();
    expect(store.getState().bookmarkedArticleSlugs).toEqual([]);
  });

  it("adds a slug to bookmarkedArticleSlugs via toggleBookmark", () => {
    const store = createAppStore();
    store.getState().toggleBookmark("validating-an-mvp");
    expect(store.getState().bookmarkedArticleSlugs).toEqual(["validating-an-mvp"]);
  });

  it("removes a slug from bookmarkedArticleSlugs when toggled again", () => {
    const store = createAppStore();
    store.getState().toggleBookmark("validating-an-mvp");
    store.getState().toggleBookmark("validating-an-mvp");
    expect(store.getState().bookmarkedArticleSlugs).toEqual([]);
  });

  it("persists bookmarkedArticleSlugs to storage after rehydration", async () => {
    const storeA = createAppStore();
    storeA.getState().toggleBookmark("validating-an-mvp");

    const storeB = createAppStore();
    await storeB.persist.rehydrate();

    expect(storeB.getState().bookmarkedArticleSlugs).toEqual(["validating-an-mvp"]);
  });

  it("defaults completedArticleSlugs to empty", () => {
    const store = createAppStore();
    expect(store.getState().completedArticleSlugs).toEqual([]);
  });

  it("adds a slug to completedArticleSlugs via toggleArticleCompleted", () => {
    const store = createAppStore();
    store.getState().toggleArticleCompleted("validating-an-mvp");
    expect(store.getState().completedArticleSlugs).toEqual(["validating-an-mvp"]);
  });

  it("removes a slug from completedArticleSlugs when toggled again", () => {
    const store = createAppStore();
    store.getState().toggleArticleCompleted("validating-an-mvp");
    store.getState().toggleArticleCompleted("validating-an-mvp");
    expect(store.getState().completedArticleSlugs).toEqual([]);
  });

  it("persists completedArticleSlugs to storage after rehydration", async () => {
    const storeA = createAppStore();
    storeA.getState().toggleArticleCompleted("validating-an-mvp");

    const storeB = createAppStore();
    await storeB.persist.rehydrate();

    expect(storeB.getState().completedArticleSlugs).toEqual(["validating-an-mvp"]);
  });
});
