import { describe, expect, it } from "vitest";

import { FICTIONAL_COMPANIES } from "@/features/homepage/shared";

import { CASE_STUDIES } from "./case-studies";
import { caseStudySchema } from "./case-study.schema";

describe("CASE_STUDIES", () => {
  it("validates against the schema", () => {
    for (const caseStudy of CASE_STUDIES) {
      expect(() => caseStudySchema.parse(caseStudy)).not.toThrow();
    }
  });

  it("has unique slugs", () => {
    const slugs = CASE_STUDIES.map((caseStudy) => caseStudy.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("references a real company for every case study", () => {
    const companyIds = new Set(FICTIONAL_COMPANIES.map((company) => company.id));
    for (const caseStudy of CASE_STUDIES) {
      expect(companyIds.has(caseStudy.companyId)).toBe(true);
    }
  });

  it("has at least one featured case study", () => {
    expect(CASE_STUDIES.some((caseStudy) => caseStudy.featured)).toBe(true);
  });
});
