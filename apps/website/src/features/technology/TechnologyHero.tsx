"use client";

import { Sparkles } from "lucide-react";

import { BlueprintGrid } from "@/components/BlueprintGrid";
import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { SearchField } from "@/components/SearchField";
import { Text } from "@/components/Text";
import { useAiCompanion } from "@/features/homepage/ai-companion";
import { cn } from "@/utils/cn";

import type { TechnologyHeroProps } from "./TechnologyHero.types";

/**
 * The `/technology` landing page's hero (CLAUDE.md Part 22): explains the
 * platform's philosophy — technology is never "best," only appropriate or
 * inappropriate for a specific problem — with search, quick category
 * filters, and an AI entry point. `headline`/`supportingCopy` are
 * overridable so a future `/technology/category/[category]` route can give
 * each landing page its own real `<h1>` instead of duplicating this
 * component's fixed copy under a second heading.
 */
export function TechnologyHero({
  query,
  onQueryChange,
  categories,
  categoryFilter,
  onCategoryQuickFilter,
  headline = "Technology Decisions, Explained.",
  supportingCopy = "Not a stack list — the reasoning behind choosing one technology over another, including when each one is the wrong choice.",
  className,
}: TechnologyHeroProps) {
  const { open: openAiCompanion } = useAiCompanion();

  return (
    <div className={cn("relative overflow-hidden rounded-lg py-16 text-center", className)}>
      <BlueprintGrid className="opacity-60" />

      <div className="relative mx-auto max-w-2xl space-y-6 px-6">
        <div className="space-y-3">
          <Heading variant="display">{headline}</Heading>
          <Text variant="subtitle">{supportingCopy}</Text>
        </div>

        <SearchField
          aria-label="Search technologies"
          placeholder="Search by name, category, or use case..."
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          onClear={() => onQueryChange("")}
          className="mx-auto max-w-md"
        />

        <div
          className="flex flex-wrap items-center justify-center gap-2"
          role="group"
          aria-label="Quick filter by category"
        >
          <Button
            variant={categoryFilter === null ? "primary" : "outline"}
            size="sm"
            onClick={() => onCategoryQuickFilter(null)}
          >
            All categories
          </Button>
          {categories.map((category) => (
            <Button
              key={category.slug}
              variant={categoryFilter === category.slug ? "primary" : "outline"}
              size="sm"
              aria-pressed={categoryFilter === category.slug}
              onClick={() => onCategoryQuickFilter(category.slug)}
            >
              {category.label}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button variant="outline" onClick={openAiCompanion}>
            <Icon icon={Sparkles} size="sm" />
            Ask Byld which technology fits your problem
          </Button>
        </div>
      </div>
    </div>
  );
}
