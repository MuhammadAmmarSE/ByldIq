import { describe, expect, it } from "vitest";

import { ENGINEERING_PRACTICES } from "./practices";

describe("ENGINEERING_PRACTICES", () => {
  it("gives every practice a title, summary, and at least one point", () => {
    for (const practice of ENGINEERING_PRACTICES) {
      expect(practice.title.length).toBeGreaterThan(0);
      expect(practice.summary.length).toBeGreaterThan(0);
      expect(practice.points.length).toBeGreaterThan(0);
    }
  });

  it("has unique ids", () => {
    const ids = ENGINEERING_PRACTICES.map((practice) => practice.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
