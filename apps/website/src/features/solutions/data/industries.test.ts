import { describe, expect, it } from "vitest";

import { CASE_STUDIES } from "@/features/case-studies";

import { industrySchema } from "./industry.schema";
import { INDUSTRIES } from "./industries";
import { SOLUTIONS } from "./solutions";

describe("INDUSTRIES", () => {
  it("validates against the schema", () => {
    for (const industry of INDUSTRIES) {
      expect(() => industrySchema.parse(industry)).not.toThrow();
    }
  });

  it("has unique slugs", () => {
    const slugs = INDUSTRIES.map((industry) => industry.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has exactly the ten industries Milestone 10 requires", () => {
    const slugs = INDUSTRIES.map((industry) => industry.slug).sort();
    expect(slugs).toEqual(
      [
        "healthcare",
        "fintech",
        "e-commerce",
        "logistics",
        "real-estate",
        "education",
        "manufacturing",
        "retail",
        "startups",
        "enterprise",
      ].sort(),
    );
  });

  it("references only real solutions", () => {
    const realSlugs = new Set(SOLUTIONS.map((solution) => solution.slug));
    for (const industry of INDUSTRIES) {
      for (const slug of industry.recommendedSolutionSlugs) {
        expect(realSlugs.has(slug)).toBe(true);
      }
    }
  });

  it("references only real case studies, and allows an honest empty list", () => {
    const realSlugs = new Set(CASE_STUDIES.map((caseStudy) => caseStudy.slug));
    for (const industry of INDUSTRIES) {
      for (const slug of industry.exampleCaseStudySlugs) {
        expect(realSlugs.has(slug)).toBe(true);
      }
    }
    expect(INDUSTRIES.some((industry) => industry.exampleCaseStudySlugs.length === 0)).toBe(true);
  });
});
