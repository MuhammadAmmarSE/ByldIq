import { describe, expect, it } from "vitest";

import { CASE_STUDIES } from "@/features/case-studies";
import { KNOWLEDGE_ARTICLES } from "@/features/homepage/knowledge-center-preview";

import { solutionSchema } from "./solution.schema";
import { getRecommendedSolution, SOLUTIONS } from "./solutions";

const SOLUTION_SLUGS = [
  "startup",
  "enterprise",
  "commerce",
  "artificial-intelligence",
  "platform-engineering",
  "cloud-infrastructure",
  "automation",
  "product-design",
  "custom-engineering",
];

describe("SOLUTIONS", () => {
  it("validates against the schema", () => {
    for (const solution of SOLUTIONS) {
      expect(() => solutionSchema.parse(solution)).not.toThrow();
    }
  });

  it("has unique slugs", () => {
    const slugs = SOLUTIONS.map((solution) => solution.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has exactly the nine routes CLAUDE.md Part 20 requires", () => {
    const slugs = SOLUTIONS.map((solution) => solution.slug).sort();
    expect(slugs).toEqual([...SOLUTION_SLUGS].sort());
  });

  it("references only real case studies", () => {
    const realSlugs = new Set(CASE_STUDIES.map((caseStudy) => caseStudy.slug));
    for (const solution of SOLUTIONS) {
      for (const slug of solution.relatedCaseStudySlugs) {
        expect(realSlugs.has(slug)).toBe(true);
      }
    }
  });

  it("references only real knowledge articles", () => {
    const realSlugs = new Set(KNOWLEDGE_ARTICLES.map((article) => article.slug));
    for (const solution of SOLUTIONS) {
      for (const slug of solution.relatedArticleSlugs) {
        expect(realSlugs.has(slug)).toBe(true);
      }
    }
  });

  it("has unique capability, technology, and architecture node ids within each solution", () => {
    for (const solution of SOLUTIONS) {
      const capabilityIds = solution.capabilities.map((capability) => capability.id);
      expect(new Set(capabilityIds).size).toBe(capabilityIds.length);

      const technologyIds = solution.technologies.map((technology) => technology.id);
      expect(new Set(technologyIds).size).toBe(technologyIds.length);

      const nodeIds = solution.architecture.map((node) => node.id);
      expect(new Set(nodeIds).size).toBe(nodeIds.length);
    }
  });
});

describe("getRecommendedSolution", () => {
  it("returns undefined when no journey is selected", () => {
    expect(getRecommendedSolution(null)).toBeUndefined();
  });

  it("returns the canonically matching solution for each journey", () => {
    expect(getRecommendedSolution("startup")?.slug).toBe("startup");
    expect(getRecommendedSolution("enterprise")?.slug).toBe("enterprise");
    expect(getRecommendedSolution("commerce")?.slug).toBe("commerce");
    expect(getRecommendedSolution("ai")?.slug).toBe("artificial-intelligence");
    expect(getRecommendedSolution("platform")?.slug).toBe("platform-engineering");
  });
});
