import { describe, expect, it } from "vitest";

import { TECHNOLOGY_CATEGORIES } from "./categories";

describe("TECHNOLOGY_CATEGORIES", () => {
  it("has a unique, non-empty slug and label for every category", () => {
    const slugs = TECHNOLOGY_CATEGORIES.map((category) => category.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const category of TECHNOLOGY_CATEGORIES) {
      expect(category.slug.length).toBeGreaterThan(0);
      expect(category.label.length).toBeGreaterThan(0);
    }
  });
});
