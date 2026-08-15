import { describe, expect, it } from "vitest";

import { PAIN_POINTS } from "./pain-points";

describe("PAIN_POINTS", () => {
  it("has unique ids", () => {
    const ids = PAIN_POINTS.map((point) => point.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives every pain point a non-empty title, description, and response", () => {
    for (const point of PAIN_POINTS) {
      expect(point.title.length).toBeGreaterThan(0);
      expect(point.description.length).toBeGreaterThan(0);
      expect(point.response.length).toBeGreaterThan(0);
    }
  });
});
