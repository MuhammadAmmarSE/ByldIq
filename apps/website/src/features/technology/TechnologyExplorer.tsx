"use client";

import { useMemo, useState } from "react";

import { Heading } from "@/components/Heading";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { CATEGORIES_BY_SLUG, POPULATED_CATEGORIES } from "./data/facets";
import { TECHNOLOGIES } from "./data/technologies";
import { TechnologyGrid } from "./TechnologyGrid";
import { TechnologyHero } from "./TechnologyHero";
import type { TechnologyExplorerProps } from "./TechnologyExplorer.types";

/**
 * The `/technology` landing page's full experience (CLAUDE.md Part 22):
 * hero, category filtering, and search — all client-side over the small,
 * fully-loaded technology dataset.
 *
 * "Popular comparisons," the Architecture Explorer, and the Decision
 * Wizard (also named in the landing page spec) aren't linked from here
 * yet — those routes (`/technology/compare`, `/technology/architecture`,
 * `/technology/decision-framework`) land in later Milestone 6 phases, and
 * linking to them before they exist would create the dead links CLAUDE.md
 * Part 8 warns against. They're added to this page once real.
 *
 * The `initial*`/`headline`/`supportingCopy` props let a future
 * `/technology/category/[category]` route reuse this exact component
 * pre-seeded with a filter, rather than building a second, thinner listing
 * page for the same content.
 */
export function TechnologyExplorer({
  className,
  initialQuery = "",
  initialCategoryFilter,
  headline,
  supportingCopy,
}: TechnologyExplorerProps) {
  const [query, setQuery] = useState(initialQuery);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(
    initialCategoryFilter ?? null,
  );
  const analytics = useAnalytics();

  const filteredTechnologies = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return TECHNOLOGIES.filter((technology) => {
      if (categoryFilter && technology.category !== categoryFilter) return false;

      if (!normalizedQuery) return true;
      const haystack =
        `${technology.name} ${technology.tagline} ${technology.businessFit} ${technology.typicalProjects.join(" ")}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [query, categoryFilter]);

  function handleQueryChange(nextQuery: string) {
    setQuery(nextQuery);
    if (nextQuery.trim()) {
      analytics.track("technology_search", { query: nextQuery });
    }
  }

  function handleCategoryFilterChange(value: string | null) {
    setCategoryFilter(value);
    if (value) {
      analytics.track("technology_category_selected", { category: value });
    }
  }

  function handleTechnologySelect(slug: string) {
    analytics.track("technology_card_clicked", { slug });
  }

  return (
    <div className={cn("space-y-10", className)}>
      <TechnologyHero
        query={query}
        onQueryChange={handleQueryChange}
        categories={POPULATED_CATEGORIES}
        categoryFilter={categoryFilter}
        onCategoryQuickFilter={handleCategoryFilterChange}
        headline={headline}
        supportingCopy={supportingCopy}
      />

      <section className="space-y-4" aria-labelledby="technology-all-heading">
        <Heading variant="h3" as="h2" id="technology-all-heading">
          All technologies
        </Heading>
        <TechnologyGrid
          technologies={filteredTechnologies}
          categoriesBySlug={CATEGORIES_BY_SLUG}
          onSelect={handleTechnologySelect}
        />
      </section>
    </div>
  );
}
