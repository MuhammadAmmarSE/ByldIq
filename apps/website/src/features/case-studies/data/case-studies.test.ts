import { describe, expect, it } from "vitest";

import { KNOWLEDGE_ARTICLES } from "@/features/homepage/knowledge-center-preview";
import { SOLUTIONS } from "@/features/solutions";

import { caseStudySchema } from "./case-study.schema";
import { CASE_STUDIES } from "./case-studies";
import { FICTIONAL_COMPANIES } from "./fictional-companies";

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

  it("has unique business problem slugs", () => {
    const problems = CASE_STUDIES.map((caseStudy) => caseStudy.businessProblem);
    expect(new Set(problems).size).toBe(problems.length);
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

  it("references only real solutions", () => {
    const realSlugs = new Set(SOLUTIONS.map((solution) => solution.slug));
    for (const caseStudy of CASE_STUDIES) {
      for (const slug of caseStudy.relatedSolutionSlugs) {
        expect(realSlugs.has(slug)).toBe(true);
      }
    }
  });

  it("references only real knowledge articles", () => {
    const realSlugs = new Set(KNOWLEDGE_ARTICLES.map((article) => article.slug));
    for (const caseStudy of CASE_STUDIES) {
      for (const slug of caseStudy.relatedArticleSlugs) {
        expect(realSlugs.has(slug)).toBe(true);
      }
    }
  });

  it("has unique architecture node and technology decision ids within each case study", () => {
    for (const caseStudy of CASE_STUDIES) {
      const nodeIds = caseStudy.architecture.map((node) => node.id);
      expect(new Set(nodeIds).size).toBe(nodeIds.length);

      const techIds = caseStudy.technologyDecisions.map((tech) => tech.id);
      expect(new Set(techIds).size).toBe(techIds.length);

      const stageIds = caseStudy.engineeringProcess.map((stage) => stage.id);
      expect(new Set(stageIds).size).toBe(stageIds.length);
    }
  });

  it("names a technology decision for every badge-list technology", () => {
    for (const caseStudy of CASE_STUDIES) {
      const decisionNames = new Set(caseStudy.technologyDecisions.map((tech) => tech.name));
      for (const technology of caseStudy.technologies) {
        expect(decisionNames.has(technology)).toBe(true);
      }
    }
  });
});
