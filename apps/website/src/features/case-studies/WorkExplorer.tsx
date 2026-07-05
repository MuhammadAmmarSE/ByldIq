"use client";

import { useMemo, useState } from "react";

import { Heading } from "@/components/Heading";
import { ProjectGrid } from "@/features/homepage/proof-engine";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";
import { slugify } from "@/utils/slugify";

import "./analytics";

import { BUSINESS_PROBLEMS } from "./data/business-problems";
import { CASE_STUDIES } from "./data/case-studies";
import { FICTIONAL_COMPANIES } from "./data/fictional-companies";
import { WorkFilterBar } from "./WorkFilterBar";
import { WorkHero } from "./WorkHero";
import type { WorkExplorerProps } from "./WorkExplorer.types";

const COMPANIES_BY_ID = new Map(FICTIONAL_COMPANIES.map((company) => [company.id, company]));

const INDUSTRIES = Array.from(
  new Map(
    CASE_STUDIES.map((caseStudy) => COMPANIES_BY_ID.get(caseStudy.companyId)?.industry)
      .filter((industry): industry is string => Boolean(industry))
      .map((industry) => [slugify(industry), industry]),
  ),
).map(([slug, label]) => ({ slug, label }));

const TECHNOLOGIES = Array.from(
  new Map(
    CASE_STUDIES.flatMap((caseStudy) => caseStudy.technologies).map((technology) => [
      slugify(technology),
      technology,
    ]),
  ),
).map(([slug, label]) => ({ slug, label }));

const FEATURED_CASE_STUDIES = CASE_STUDIES.filter((caseStudy) => caseStudy.featured);

/**
 * The `/work` landing page's full experience (CLAUDE.md Part 21): hero,
 * featured work, multi-facet filtering, and the project grid — all
 * client-side over the small, fully-loaded case study dataset. Reuses the
 * Proof Engine's `ProjectGrid`/`ProjectCard` rather than a second card
 * implementation for the same content.
 *
 * "Trending projects" (also named in the spec) isn't implemented as a
 * ranked section: there's no real traffic or engagement data yet to rank
 * by, and fabricating a trending order would be exactly the kind of
 * invented signal CLAUDE.md's "never fabricate numbers" principle warns
 * against applied to metrics. The full grid below Featured serves
 * discovery instead.
 */
export function WorkExplorer({ className }: WorkExplorerProps) {
  const [query, setQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState<string | null>(null);
  const [technologyFilter, setTechnologyFilter] = useState<string | null>(null);
  const [businessProblemFilter, setBusinessProblemFilter] = useState<string | null>(null);
  const [aiOnly, setAiOnly] = useState(false);
  const analytics = useAnalytics();

  const filteredCaseStudies = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return CASE_STUDIES.filter((caseStudy) => {
      const company = COMPANIES_BY_ID.get(caseStudy.companyId);

      if (industryFilter && slugify(company?.industry ?? "") !== industryFilter) return false;
      if (
        technologyFilter &&
        !caseStudy.technologies.some((technology) => slugify(technology) === technologyFilter)
      ) {
        return false;
      }
      if (businessProblemFilter && caseStudy.businessProblem !== businessProblemFilter) {
        return false;
      }
      if (aiOnly && !caseStudy.aiInvolvement) return false;

      if (!normalizedQuery) return true;
      const haystack =
        `${caseStudy.headline} ${caseStudy.executiveSummary} ${caseStudy.challenge} ${company?.name ?? ""} ${caseStudy.technologies.join(" ")}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [query, industryFilter, technologyFilter, businessProblemFilter, aiOnly]);

  function handleQueryChange(nextQuery: string) {
    setQuery(nextQuery);
    if (nextQuery.trim()) {
      analytics.track("work_search", { query: nextQuery });
    }
  }

  function handleIndustryFilterChange(value: string | null) {
    setIndustryFilter(value);
    analytics.track("work_filter_changed", { facet: "industry", value });
  }

  function handleTechnologyFilterChange(value: string | null) {
    setTechnologyFilter(value);
    analytics.track("work_filter_changed", { facet: "technology", value });
  }

  function handleBusinessProblemFilterChange(value: string | null) {
    setBusinessProblemFilter(value);
    analytics.track("work_filter_changed", { facet: "business-problem", value });
  }

  function handleAiOnlyChange(value: boolean) {
    setAiOnly(value);
    analytics.track("work_filter_changed", {
      facet: "ai-involvement",
      value: value ? "ai-only" : null,
    });
  }

  function handleProjectSelect(slug: string) {
    analytics.track("work_project_clicked", { slug });
  }

  return (
    <div className={cn("space-y-10", className)}>
      <WorkHero
        query={query}
        onQueryChange={handleQueryChange}
        industries={INDUSTRIES}
        industryFilter={industryFilter}
        onIndustryQuickFilter={handleIndustryFilterChange}
        featured={FEATURED_CASE_STUDIES[0]}
      />

      {FEATURED_CASE_STUDIES.length > 0 && (
        <section className="space-y-4" aria-labelledby="work-featured-heading">
          <Heading variant="h3" as="h2" id="work-featured-heading">
            Featured work
          </Heading>
          <ProjectGrid
            caseStudies={FEATURED_CASE_STUDIES}
            companiesById={COMPANIES_BY_ID}
            onSelect={handleProjectSelect}
          />
        </section>
      )}

      <section className="space-y-4" aria-labelledby="work-all-heading">
        <Heading variant="h3" as="h2" id="work-all-heading">
          All engineering stories
        </Heading>
        <WorkFilterBar
          industries={INDUSTRIES}
          industryFilter={industryFilter}
          onIndustryFilterChange={handleIndustryFilterChange}
          technologies={TECHNOLOGIES}
          technologyFilter={technologyFilter}
          onTechnologyFilterChange={handleTechnologyFilterChange}
          businessProblems={BUSINESS_PROBLEMS}
          businessProblemFilter={businessProblemFilter}
          onBusinessProblemFilterChange={handleBusinessProblemFilterChange}
          aiOnly={aiOnly}
          onAiOnlyChange={handleAiOnlyChange}
        />
        <ProjectGrid
          caseStudies={filteredCaseStudies}
          companiesById={COMPANIES_BY_ID}
          onSelect={handleProjectSelect}
        />
      </section>
    </div>
  );
}
