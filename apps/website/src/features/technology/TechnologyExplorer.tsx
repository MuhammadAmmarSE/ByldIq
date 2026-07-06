"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { CATEGORIES_BY_SLUG, POPULATED_CATEGORIES } from "./data/facets";
import { TECHNOLOGIES } from "./data/technologies";
import { TechnologyGrid } from "./TechnologyGrid";
import { TechnologyHero } from "./TechnologyHero";
import type { TechnologyExplorerProps } from "./TechnologyExplorer.types";

const POPULAR_COMPARISONS = [
  { href: "/technology/compare?a=next-js&b=remix", label: "Next.js vs Remix" },
  { href: "/technology/compare?a=postgresql&b=mongodb", label: "PostgreSQL vs MongoDB" },
] as const;

/**
 * The `/technology` landing page's full experience (CLAUDE.md Part 22):
 * hero, category filtering, search, popular comparisons, and the Decision
 * Framework — all client-side over the small, fully-loaded technology
 * dataset.
 *
 * The Architecture Explorer (also named in the landing page spec) isn't
 * linked from here yet — that route (`/technology/architecture`) doesn't
 * exist yet, and linking to it before it exists would create the dead
 * links CLAUDE.md Part 8 warns against. It's added to this page once real.
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

      <section className="space-y-4" aria-labelledby="technology-comparisons-heading">
        <Heading variant="h3" as="h2" id="technology-comparisons-heading">
          Popular comparisons
        </Heading>
        <div className="flex flex-wrap items-center gap-2">
          {POPULAR_COMPARISONS.map((comparison) => (
            <Button key={comparison.href} asChild variant="outline" size="sm">
              <Link href={comparison.href}>{comparison.label}</Link>
            </Button>
          ))}
          <Button asChild variant="ghost" size="sm">
            <Link href="/technology/compare">Compare any two &rarr;</Link>
          </Button>
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="technology-decision-heading">
        <Heading variant="h3" as="h2" id="technology-decision-heading">
          Not sure where to start?
        </Heading>
        <div>
          <Button asChild variant="outline">
            <Link href="/technology/decision-framework">Use the decision framework</Link>
          </Button>
        </div>
      </section>

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
