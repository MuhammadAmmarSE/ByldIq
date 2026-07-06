import { describe, expect, it } from "vitest";

import { TECHNOLOGY_CATEGORIES } from "./categories";
import { CATEGORIES_BY_SLUG, POPULATED_CATEGORIES } from "./facets";
import { TECHNOLOGIES } from "./technologies";

describe("POPULATED_CATEGORIES", () => {
  it("only includes categories with at least one real technology", () => {
    for (const category of POPULATED_CATEGORIES) {
      expect(TECHNOLOGIES.some((technology) => technology.category === category.slug)).toBe(true);
    }
  });

  it("is a subset of the full taxonomy", () => {
    const allSlugs = new Set(TECHNOLOGY_CATEGORIES.map((category) => category.slug));
    for (const category of POPULATED_CATEGORIES) {
      expect(allSlugs.has(category.slug)).toBe(true);
    }
  });
});

describe("CATEGORIES_BY_SLUG", () => {
  it("maps every category slug to its label", () => {
    expect(CATEGORIES_BY_SLUG.size).toBe(TECHNOLOGY_CATEGORIES.length);
    for (const technology of TECHNOLOGIES) {
      expect(CATEGORIES_BY_SLUG.get(technology.category)?.label).toBeTruthy();
    }
  });
});
