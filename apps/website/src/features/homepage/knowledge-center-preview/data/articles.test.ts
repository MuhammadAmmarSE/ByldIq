import { describe, expect, it } from "vitest";

import { KNOWLEDGE_ARTICLES } from "./articles";

describe("KNOWLEDGE_ARTICLES", () => {
  it("has unique slugs", () => {
    const slugs = KNOWLEDGE_ARTICLES.map((article) => article.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("gives every article a title, category, summary, and AI summary", () => {
    for (const article of KNOWLEDGE_ARTICLES) {
      expect(article.title.length).toBeGreaterThan(0);
      expect(article.category.length).toBeGreaterThan(0);
      expect(article.summary.length).toBeGreaterThan(0);
      expect(article.aiSummary.length).toBeGreaterThan(0);
    }
  });

  it("has exactly one featured article", () => {
    expect(KNOWLEDGE_ARTICLES.filter((article) => article.featured)).toHaveLength(1);
  });
});
