import { describe, expect, it } from "vitest";

import { CASE_STUDIES } from "@/features/case-studies";
import { SOLUTIONS } from "@/features/solutions";
import { TECHNOLOGIES } from "@/features/technology";

import { KNOWLEDGE_ARTICLES } from "./articles";
import { KNOWLEDGE_CATEGORIES } from "./categories";
import { knowledgeArticleSchema } from "./knowledge-article.schema";

describe("KNOWLEDGE_ARTICLES", () => {
  it("validates against the schema", () => {
    for (const article of KNOWLEDGE_ARTICLES) {
      expect(() => knowledgeArticleSchema.parse(article)).not.toThrow();
    }
  });

  it("has unique slugs", () => {
    const slugs = KNOWLEDGE_ARTICLES.map((article) => article.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has exactly one featured article", () => {
    expect(KNOWLEDGE_ARTICLES.filter((article) => article.featured)).toHaveLength(1);
  });

  it("references only real categories", () => {
    const categorySlugs = new Set(KNOWLEDGE_CATEGORIES.map((category) => category.slug));
    for (const article of KNOWLEDGE_ARTICLES) {
      expect(categorySlugs.has(article.category)).toBe(true);
    }
  });

  it("references only real technologies", () => {
    const realSlugs = new Set(TECHNOLOGIES.map((technology) => technology.slug));
    for (const article of KNOWLEDGE_ARTICLES) {
      for (const slug of article.relatedTechnologySlugs) {
        expect(realSlugs.has(slug)).toBe(true);
      }
    }
  });

  it("references only real solutions", () => {
    const realSlugs = new Set(SOLUTIONS.map((solution) => solution.slug));
    for (const article of KNOWLEDGE_ARTICLES) {
      for (const slug of article.relatedSolutionSlugs) {
        expect(realSlugs.has(slug)).toBe(true);
      }
    }
  });

  it("references only real case studies", () => {
    const realSlugs = new Set(CASE_STUDIES.map((caseStudy) => caseStudy.slug));
    for (const article of KNOWLEDGE_ARTICLES) {
      for (const slug of article.relatedCaseStudySlugs) {
        expect(realSlugs.has(slug)).toBe(true);
      }
    }
  });

  it("references only real articles in relatedArticleSlugs, excluding itself", () => {
    const realSlugs = new Set(KNOWLEDGE_ARTICLES.map((article) => article.slug));
    for (const article of KNOWLEDGE_ARTICLES) {
      for (const slug of article.relatedArticleSlugs) {
        expect(realSlugs.has(slug)).toBe(true);
        expect(slug).not.toBe(article.slug);
      }
    }
  });

  it("has unique walkthrough step ids within each article", () => {
    for (const article of KNOWLEDGE_ARTICLES) {
      const ids = article.walkthrough.map((step) => step.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("every playbook-typed article has a real playbook field with checklist steps", () => {
    const playbookArticles = KNOWLEDGE_ARTICLES.filter((article) => article.type === "playbook");
    expect(playbookArticles.length).toBeGreaterThanOrEqual(2);

    for (const article of playbookArticles) {
      expect(article.playbook).toBeDefined();
      expect(article.playbook?.steps.length).toBeGreaterThanOrEqual(3);
      for (const step of article.playbook?.steps ?? []) {
        expect(step.checklistItems.length).toBeGreaterThan(0);
      }
    }
  });

  it("has unique playbook step ids within each playbook", () => {
    for (const article of KNOWLEDGE_ARTICLES) {
      if (!article.playbook) continue;
      const ids = article.playbook.steps.map((step) => step.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("only links playbook resources to real internal routes", () => {
    for (const article of KNOWLEDGE_ARTICLES) {
      if (!article.playbook) continue;
      for (const resource of article.playbook.resources) {
        expect(resource.href.startsWith("/")).toBe(true);
      }
    }
  });
});
