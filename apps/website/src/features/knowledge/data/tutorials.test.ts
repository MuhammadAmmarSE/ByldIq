import { describe, expect, it } from "vitest";

import { TECHNOLOGIES } from "@/features/technology";

import { KNOWLEDGE_ARTICLES } from "./articles";
import { KNOWLEDGE_CATEGORIES } from "./categories";
import { tutorialSchema } from "./tutorial.schema";
import { TUTORIALS } from "./tutorials";

describe("TUTORIALS", () => {
  it("validates against the schema", () => {
    for (const tutorial of TUTORIALS) {
      expect(() => tutorialSchema.parse(tutorial)).not.toThrow();
    }
  });

  it("has at least one real tutorial", () => {
    expect(TUTORIALS.length).toBeGreaterThanOrEqual(1);
  });

  it("has unique slugs", () => {
    const slugs = TUTORIALS.map((tutorial) => tutorial.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("references only real categories", () => {
    const categorySlugs = new Set(KNOWLEDGE_CATEGORIES.map((category) => category.slug));
    for (const tutorial of TUTORIALS) {
      expect(categorySlugs.has(tutorial.category)).toBe(true);
    }
  });

  it("references only real technologies", () => {
    const realSlugs = new Set(TECHNOLOGIES.map((technology) => technology.slug));
    for (const tutorial of TUTORIALS) {
      for (const slug of tutorial.relatedTechnologySlugs) {
        expect(realSlugs.has(slug)).toBe(true);
      }
    }
  });

  it("references only real articles", () => {
    const realSlugs = new Set(KNOWLEDGE_ARTICLES.map((article) => article.slug));
    for (const tutorial of TUTORIALS) {
      for (const slug of tutorial.relatedArticleSlugs) {
        expect(realSlugs.has(slug)).toBe(true);
      }
    }
  });

  it("has unique step ids within each tutorial", () => {
    for (const tutorial of TUTORIALS) {
      const ids = tutorial.steps.map((step) => step.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });
});
