import { describe, expect, it } from "vitest";

import { BUSINESS_PROBLEMS } from "./business-problems";
import { CASE_STUDIES } from "./case-studies";

describe("BUSINESS_PROBLEMS", () => {
  it("has unique slugs", () => {
    const slugs = BUSINESS_PROBLEMS.map((problem) => problem.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("matches exactly the business problems used across CASE_STUDIES", () => {
    const usedSlugs = new Set(CASE_STUDIES.map((caseStudy) => caseStudy.businessProblem));
    const definedSlugs = new Set(BUSINESS_PROBLEMS.map((problem) => problem.slug));
    expect(definedSlugs).toEqual(usedSlugs);
  });
});
