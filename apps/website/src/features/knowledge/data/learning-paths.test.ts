import { describe, expect, it } from "vitest";

import { KNOWLEDGE_ARTICLES } from "./articles";
import { LEARNING_PATHS } from "./learning-paths";

describe("LEARNING_PATHS", () => {
  it("has unique slugs", () => {
    const slugs = LEARNING_PATHS.map((path) => path.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has at least two articles per path (a genuine ordered journey, not a single item)", () => {
    for (const path of LEARNING_PATHS) {
      expect(path.articleSlugs.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("has unique article slugs within each path", () => {
    for (const path of LEARNING_PATHS) {
      expect(new Set(path.articleSlugs).size).toBe(path.articleSlugs.length);
    }
  });

  it("references only real articles", () => {
    const realSlugs = new Set(KNOWLEDGE_ARTICLES.map((article) => article.slug));
    for (const path of LEARNING_PATHS) {
      for (const slug of path.articleSlugs) {
        expect(realSlugs.has(slug)).toBe(true);
      }
    }
  });
});
