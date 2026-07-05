import { describe, expect, it } from "vitest";

import { BUILDPATH_GOALS } from "./goals";

describe("BUILDPATH_GOALS", () => {
  it("gives every goal a unique id, label, and recommendation", () => {
    const ids = BUILDPATH_GOALS.map((goal) => goal.id);
    expect(new Set(ids).size).toBe(ids.length);

    for (const goal of BUILDPATH_GOALS) {
      expect(goal.label.length).toBeGreaterThan(0);
      expect(goal.recommendation.length).toBeGreaterThan(0);
    }
  });
});
