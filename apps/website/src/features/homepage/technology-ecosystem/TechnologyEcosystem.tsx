"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/Button";
import { Chip } from "@/components/Chip";
import { SectionHeader } from "@/components/SectionHeader";
import {
  CATEGORIES_BY_SLUG,
  POPULATED_CATEGORIES,
  TECHNOLOGIES,
  TechnologyGrid,
} from "@/features/technology";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { TechnologyEcosystemProps } from "./TechnologyEcosystem.types";

/**
 * Milestone 9's Technology Ecosystem homepage section: an interactive,
 * category-filterable preview of the real Technology Explorer platform
 * (Milestone 6), not a second, separate "our stack" list. Reuses
 * `TECHNOLOGIES`, `POPULATED_CATEGORIES` and `TechnologyGrid` directly so
 * every card here is the same card — and links to the same detail page —
 * as the full `/technology` platform.
 */
export function TechnologyEcosystem({ className }: TechnologyEcosystemProps) {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const analytics = useAnalytics();

  const filteredTechnologies = useMemo(() => {
    if (!categoryFilter) return TECHNOLOGIES;
    return TECHNOLOGIES.filter((technology) => technology.category === categoryFilter);
  }, [categoryFilter]);

  function handleCategoryToggle(category: string) {
    const next = categoryFilter === category ? null : category;
    setCategoryFilter(next);
    analytics.track("technology_ecosystem_category_filtered", { category: next });
  }

  function handleSelect(slug: string) {
    analytics.track("technology_ecosystem_card_clicked", { slug });
  }

  return (
    <div className={cn("space-y-10", className)}>
      <SectionHeader
        eyebrow="Technology"
        heading="An ecosystem chosen for trade-offs, not trends."
        description="Every technology we work with is documented with its strengths, weaknesses, and the situations where a different choice would fit better."
        actions={
          <Button asChild variant="outline">
            <Link href="/technology">Explore the full Technology Explorer</Link>
          </Button>
        }
      />

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by technology category">
        <Chip
          variant="outline"
          selected={categoryFilter === null}
          onClick={() => {
            setCategoryFilter(null);
            analytics.track("technology_ecosystem_category_filtered", { category: null });
          }}
        >
          All
        </Chip>
        {POPULATED_CATEGORIES.map((category) => (
          <Chip
            key={category.slug}
            variant="outline"
            selected={categoryFilter === category.slug}
            onClick={() => handleCategoryToggle(category.slug)}
          >
            {category.label}
          </Chip>
        ))}
      </div>

      <TechnologyGrid
        technologies={filteredTechnologies}
        categoriesBySlug={CATEGORIES_BY_SLUG}
        onSelect={handleSelect}
      />
    </div>
  );
}
