import { describe, expect, it } from "vitest";

import { CASE_STUDIES } from "./case-studies";
import { INDUSTRIES, TECHNOLOGIES } from "./facets";

describe("facets", () => {
  it("derives a unique, non-empty slug for every industry represented in CASE_STUDIES", () => {
    expect(INDUSTRIES.length).toBeGreaterThan(0);
    const slugs = INDUSTRIES.map((industry) => industry.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const industry of INDUSTRIES) {
      expect(industry.slug.length).toBeGreaterThan(0);
      expect(industry.label.length).toBeGreaterThan(0);
    }
  });

  it("derives a unique, non-empty slug for every technology represented in CASE_STUDIES", () => {
    expect(TECHNOLOGIES.length).toBeGreaterThan(0);
    const slugs = TECHNOLOGIES.map((technology) => technology.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const technology of TECHNOLOGIES) {
      expect(technology.slug.length).toBeGreaterThan(0);
      expect(technology.label.length).toBeGreaterThan(0);
    }
  });

  it("covers every case study's technologies", () => {
    const allTechnologies = new Set(CASE_STUDIES.flatMap((caseStudy) => caseStudy.technologies));
    const coveredLabels = new Set(TECHNOLOGIES.map((technology) => technology.label));
    for (const technology of allTechnologies) {
      expect(coveredLabels.has(technology)).toBe(true);
    }
  });
});
