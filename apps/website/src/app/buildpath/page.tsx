import type { Metadata } from "next";

import { BuildPathShell } from "@/features/buildpath";
import {
  journeyToProjectTypes,
  knowledgeCategoryToProjectTypes,
  technologyCategoryToProjectTypes,
} from "@/features/buildpath/entry-context";
import type { EntryContext, ProjectType } from "@/features/buildpath/types";
import { CASE_STUDIES, FICTIONAL_COMPANIES } from "@/features/case-studies";
import { KNOWLEDGE_ARTICLES, TUTORIALS } from "@/features/knowledge";
import { SOLUTIONS } from "@/features/solutions";
import { TECHNOLOGIES } from "@/features/technology";

interface BuildPathPageProps {
  searchParams: Promise<{
    solution?: string;
    caseStudy?: string;
    technology?: string;
    article?: string;
    tutorial?: string;
  }>;
}

export const metadata: Metadata = {
  title: "BuildPath",
  description:
    "BuildPath turns a conversation about your product into a roadmap, technology recommendations, and next steps.",
};

/**
 * Resolves the referring page (Solutions/Work/Technology/Knowledge all link
 * here with a query param — CLAUDE.md §5's "context should be carried into
 * BuildPath") into an `EntryContext` + prefilled `ProjectType[]`, handed to
 * `BuildPathShell` which applies it once via the store's
 * `applyEntryContext` — never overwriting an in-progress plan.
 */
function resolveEntryContext(params: {
  solution?: string;
  caseStudy?: string;
  technology?: string;
  article?: string;
  tutorial?: string;
}): { entryContext: EntryContext | null; prefillProjectTypes: ProjectType[] } {
  const solution = SOLUTIONS.find((candidate) => candidate.slug === params.solution);
  if (solution) {
    return {
      entryContext: { source: "solution", label: solution.title, solutionSlug: solution.slug },
      prefillProjectTypes: journeyToProjectTypes(solution.journey),
    };
  }

  const caseStudy = CASE_STUDIES.find((candidate) => candidate.slug === params.caseStudy);
  if (caseStudy) {
    const company = FICTIONAL_COMPANIES.find((candidate) => candidate.id === caseStudy.companyId);
    return {
      entryContext: {
        source: "case-study",
        label: company ? `${company.name}'s story` : caseStudy.slug,
        caseStudySlug: caseStudy.slug,
        industry: company?.industry,
      },
      prefillProjectTypes: [],
    };
  }

  const technology = TECHNOLOGIES.find((candidate) => candidate.slug === params.technology);
  if (technology) {
    return {
      entryContext: {
        source: "technology",
        label: technology.name,
        technologySlug: technology.slug,
      },
      prefillProjectTypes: technologyCategoryToProjectTypes(technology.category),
    };
  }

  const article = KNOWLEDGE_ARTICLES.find((candidate) => candidate.slug === params.article);
  if (article) {
    return {
      entryContext: { source: "knowledge", label: article.title, articleSlug: article.slug },
      prefillProjectTypes: knowledgeCategoryToProjectTypes(article.category),
    };
  }

  const tutorial = TUTORIALS.find((candidate) => candidate.slug === params.tutorial);
  if (tutorial) {
    return {
      entryContext: { source: "tutorial", label: tutorial.title, tutorialSlug: tutorial.slug },
      prefillProjectTypes: knowledgeCategoryToProjectTypes(tutorial.category),
    };
  }

  return { entryContext: null, prefillProjectTypes: [] };
}

export default async function BuildPathPage({ searchParams }: BuildPathPageProps) {
  const params = await searchParams;
  const { entryContext, prefillProjectTypes } = resolveEntryContext(params);

  return <BuildPathShell entryContext={entryContext} prefillProjectTypes={prefillProjectTypes} />;
}
