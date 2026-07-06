"use client";

import { Heading } from "@/components/Heading";
import { SOLUTIONS, SolutionCard } from "@/features/solutions";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { TechnologyRelatedSolutionsProps } from "./TechnologyRelatedSolutions.types";

const SOLUTIONS_BY_SLUG = new Map(SOLUTIONS.map((solution) => [solution.slug, solution]));

/**
 * CLAUDE.md Part 22's Solutions integration. Unlike Solutions/Case
 * Studies (where every entry always has at least one curated related
 * item), a technology's `relatedSolutionSlugs` is deliberately allowed to
 * be empty where no genuine connection exists (see
 * `technology.schema.ts`) — MongoDB, for example, has none. This section
 * renders nothing rather than an empty heading in that case.
 */
export function TechnologyRelatedSolutions({
  technology,
  className,
}: TechnologyRelatedSolutionsProps) {
  const analytics = useAnalytics();

  if (technology.relatedSolutionSlugs.length === 0) return null;

  return (
    <section id="related-solutions" className={cn("max-w-3xl space-y-4", className)}>
      <Heading variant="h3" as="h2">
        Where this shows up
      </Heading>

      <div className="grid gap-6 sm:grid-cols-2">
        {technology.relatedSolutionSlugs.map((slug) => {
          const solution = SOLUTIONS_BY_SLUG.get(slug);
          if (!solution) return null;

          return (
            <SolutionCard
              key={slug}
              solution={solution}
              onSelect={(solutionSlug) =>
                analytics.track("technology_solution_clicked", {
                  slug: technology.slug,
                  solutionSlug,
                })
              }
            />
          );
        })}
      </div>
    </section>
  );
}
