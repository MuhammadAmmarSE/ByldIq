import { describe, expect, it } from "vitest";

import { KNOWLEDGE_ARTICLES } from "./articles";
import { KNOWLEDGE_CATEGORIES } from "./categories";
import { CATEGORIES_BY_SLUG, POPULATED_CATEGORIES } from "./facets";

describe("POPULATED_CATEGORIES", () => {
  it("only includes categories with at least one real article", () => {
    for (const category of POPULATED_CATEGORIES) {
      expect(KNOWLEDGE_ARTICLES.some((article) => article.category === category.slug)).toBe(true);
    }
  });

  it("is a subset of the full taxonomy", () => {
    const allSlugs = new Set(KNOWLEDGE_CATEGORIES.map((category) => category.slug));
    for (const category of POPULATED_CATEGORIES) {
      expect(allSlugs.has(category.slug)).toBe(true);
    }
  });
});

describe("CATEGORIES_BY_SLUG", () => {
  it("maps every category slug to its label", () => {
    expect(CATEGORIES_BY_SLUG.size).toBe(KNOWLEDGE_CATEGORIES.length);
    for (const article of KNOWLEDGE_ARTICLES) {
      expect(CATEGORIES_BY_SLUG.get(article.category)?.label).toBeTruthy();
    }
  });
});
