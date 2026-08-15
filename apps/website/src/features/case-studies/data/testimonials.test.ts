import { describe, expect, it } from "vitest";

import { CASE_STUDIES } from "./case-studies";
import { FICTIONAL_COMPANIES } from "./fictional-companies";
import { TESTIMONIALS } from "./testimonials";

describe("TESTIMONIALS", () => {
  it("has unique ids", () => {
    const ids = TESTIMONIALS.map((testimonial) => testimonial.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("references a real company and case study for every testimonial", () => {
    const companyIds = new Set(FICTIONAL_COMPANIES.map((company) => company.id));
    const caseStudySlugs = new Set(CASE_STUDIES.map((caseStudy) => caseStudy.slug));

    for (const testimonial of TESTIMONIALS) {
      expect(companyIds.has(testimonial.companyId)).toBe(true);
      expect(caseStudySlugs.has(testimonial.caseStudySlug)).toBe(true);
    }
  });

  it("attributes the case study's real company to the testimonial", () => {
    const caseStudiesBySlug = new Map(CASE_STUDIES.map((caseStudy) => [caseStudy.slug, caseStudy]));

    for (const testimonial of TESTIMONIALS) {
      const caseStudy = caseStudiesBySlug.get(testimonial.caseStudySlug);
      expect(caseStudy?.companyId).toBe(testimonial.companyId);
    }
  });
});
