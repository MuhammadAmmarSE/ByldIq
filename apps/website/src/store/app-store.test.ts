import { describe, expect, it } from "vitest";

import { createAppStore } from "@/store/app-store";

describe("createAppStore", () => {
  it("defaults journey to null", () => {
    const store = createAppStore();
    expect(store.getState().journey).toBeNull();
  });

  it("updates journey via setJourney", () => {
    const store = createAppStore();
    store.getState().setJourney("startup");
    expect(store.getState().journey).toBe("startup");
  });

  it("creates independent instances per call", () => {
    const storeA = createAppStore();
    const storeB = createAppStore();
    storeA.getState().setJourney("enterprise");
    expect(storeB.getState().journey).toBeNull();
  });
});
