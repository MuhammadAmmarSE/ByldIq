"use client";

import { useMemo, useState } from "react";

import { Heading } from "@/components/Heading";
import { CASE_STUDIES, FICTIONAL_COMPANIES } from "@/features/case-studies";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import type { Journey } from "@/types/journey";
import { cn } from "@/utils/cn";

import "./analytics";

import { FeaturedProjectStory } from "./FeaturedProjectStory";
import { ProjectFilterBar } from "./ProjectFilterBar";
import { ProjectGrid } from "./ProjectGrid";
import type { ProofEngineProps } from "./ProofEngine.types";

const COMPANIES_BY_ID = new Map(FICTIONAL_COMPANIES.map((company) => [company.id, company]));
const FEATURED_CASE_STUDY = CASE_STUDIES.find((caseStudy) => caseStudy.featured) ?? CASE_STUDIES[0];

/**
 * CLAUDE.md Part 13's Proof Engine: a filterable, searchable project grid
 * plus a large featured story. Filtering is entirely client-side over the
 * small local dataset (Phase 5's `case-studies.ts`) — no loading state
 * needed, filtering feels instant.
 */
export function ProofEngine({ className }: ProofEngineProps) {
  const [query, setQuery] = useState("");
  const [journeyFilter, setJourneyFilter] = useState<Journey | null>(null);
  const analytics = useAnalytics();

  const filteredCaseStudies = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return CASE_STUDIES.filter((caseStudy) => {
      const company = COMPANIES_BY_ID.get(caseStudy.companyId);
      if (journeyFilter && company?.journey !== journeyFilter) return false;

      if (!normalizedQuery) return true;
      const haystack =
        `${caseStudy.headline} ${caseStudy.challenge} ${company?.name ?? ""} ${caseStudy.technologies.join(" ")}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [query, journeyFilter]);

  function handleQueryChange(nextQuery: string) {
    setQuery(nextQuery);
    if (nextQuery.trim()) {
      analytics.track("proof_search", { query: nextQuery });
    }
  }

  function handleJourneyFilterChange(nextJourney: Journey | null) {
    setJourneyFilter(nextJourney);
    analytics.track("proof_filter_changed", { journey: nextJourney });
  }

  function handleProjectSelect(slug: string) {
    analytics.track("proof_project_clicked", { slug });
  }

  const featuredCompany = FEATURED_CASE_STUDY
    ? COMPANIES_BY_ID.get(FEATURED_CASE_STUDY.companyId)
    : undefined;

  return (
    <div className={cn("space-y-10", className)}>
      {/* Headline option from CLAUDE.md Part 13. */}
      <Heading variant="h2">Engineering Success Stories.</Heading>

      {FEATURED_CASE_STUDY && featuredCompany && (
        <FeaturedProjectStory caseStudy={FEATURED_CASE_STUDY} company={featuredCompany} />
      )}

      <ProjectFilterBar
        query={query}
        onQueryChange={handleQueryChange}
        journeyFilter={journeyFilter}
        onJourneyFilterChange={handleJourneyFilterChange}
      />

      <ProjectGrid
        caseStudies={filteredCaseStudies}
        companiesById={COMPANIES_BY_ID}
        onSelect={handleProjectSelect}
      />
    </div>
  );
}
