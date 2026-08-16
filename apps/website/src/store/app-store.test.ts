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

  it("defaults checkedPlaybookItemIds to empty", () => {
    const store = createAppStore();
    expect(store.getState().checkedPlaybookItemIds).toEqual([]);
  });

  it("adds an item id via toggleChecklistItem", () => {
    const store = createAppStore();
    store.getState().toggleChecklistItem("architecture-review-playbook:write-it-down:0");
    expect(store.getState().checkedPlaybookItemIds).toEqual([
      "architecture-review-playbook:write-it-down:0",
    ]);
  });

  it("removes an item id from checkedPlaybookItemIds when toggled again", () => {
    const store = createAppStore();
    store.getState().toggleChecklistItem("architecture-review-playbook:write-it-down:0");
    store.getState().toggleChecklistItem("architecture-review-playbook:write-it-down:0");
    expect(store.getState().checkedPlaybookItemIds).toEqual([]);
  });

  it("persists checkedPlaybookItemIds to storage after rehydration", async () => {
    const storeA = createAppStore();
    storeA.getState().toggleChecklistItem("architecture-review-playbook:write-it-down:0");

    const storeB = createAppStore();
    await storeB.persist.rehydrate();

    expect(storeB.getState().checkedPlaybookItemIds).toEqual([
      "architecture-review-playbook:write-it-down:0",
    ]);
  });

  it("defaults readingProgressBySlug to empty", () => {
    const store = createAppStore();
    expect(store.getState().readingProgressBySlug).toEqual({});
  });

  it("records a slug's reading percentage via setReadingProgress", () => {
    const store = createAppStore();
    store.getState().setReadingProgress("validating-an-mvp", 42);
    expect(store.getState().readingProgressBySlug).toEqual({ "validating-an-mvp": 42 });
  });

  it("overwrites a slug's percentage without disturbing other slugs", () => {
    const store = createAppStore();
    store.getState().setReadingProgress("validating-an-mvp", 42);
    store.getState().setReadingProgress("rag-vs-fine-tuning", 10);
    store.getState().setReadingProgress("validating-an-mvp", 80);
    expect(store.getState().readingProgressBySlug).toEqual({
      "validating-an-mvp": 80,
      "rag-vs-fine-tuning": 10,
    });
  });

  it("persists readingProgressBySlug to storage after rehydration", async () => {
    const storeA = createAppStore();
    storeA.getState().setReadingProgress("validating-an-mvp", 55);

    const storeB = createAppStore();
    await storeB.persist.rehydrate();

    expect(storeB.getState().readingProgressBySlug).toEqual({ "validating-an-mvp": 55 });
  });
});
