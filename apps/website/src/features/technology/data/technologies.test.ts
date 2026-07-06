import { describe, expect, it } from "vitest";

import { CASE_STUDIES } from "@/features/case-studies";
import { KNOWLEDGE_ARTICLES } from "@/features/homepage/knowledge-center-preview";
import { SOLUTIONS } from "@/features/solutions";

import { TECHNOLOGY_CATEGORIES } from "./categories";
import { technologySchema } from "./technology.schema";
import { TECHNOLOGIES } from "./technologies";

describe("TECHNOLOGIES", () => {
  it("validates against the schema", () => {
    for (const technology of TECHNOLOGIES) {
      expect(() => technologySchema.parse(technology)).not.toThrow();
    }
  });

  it("has unique slugs", () => {
    const slugs = TECHNOLOGIES.map((technology) => technology.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("references only real categories", () => {
    const categorySlugs = new Set(TECHNOLOGY_CATEGORIES.map((category) => category.slug));
    for (const technology of TECHNOLOGIES) {
      expect(categorySlugs.has(technology.category)).toBe(true);
    }
  });

  it("references only real solutions", () => {
    const realSlugs = new Set(SOLUTIONS.map((solution) => solution.slug));
    for (const technology of TECHNOLOGIES) {
      for (const slug of technology.relatedSolutionSlugs) {
        expect(realSlugs.has(slug)).toBe(true);
      }
    }
  });

  it("references only real case studies", () => {
    const realSlugs = new Set(CASE_STUDIES.map((caseStudy) => caseStudy.slug));
    for (const technology of TECHNOLOGIES) {
      for (const slug of technology.relatedCaseStudySlugs) {
        expect(realSlugs.has(slug)).toBe(true);
      }
    }
  });

  it("references only real knowledge articles", () => {
    const realSlugs = new Set(KNOWLEDGE_ARTICLES.map((article) => article.slug));
    for (const technology of TECHNOLOGIES) {
      for (const slug of technology.relatedArticleSlugs) {
        expect(realSlugs.has(slug)).toBe(true);
      }
    }
  });

  it("has unique architecture node ids within each technology", () => {
    for (const technology of TECHNOLOGIES) {
      const nodeIds = technology.architecture.map((node) => node.id);
      expect(new Set(nodeIds).size).toBe(nodeIds.length);
    }
  });
});
