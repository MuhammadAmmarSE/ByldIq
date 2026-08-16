"use client";

import { Heading } from "@/components/Heading";
import { SOLUTIONS, SolutionCard } from "@/features/solutions";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { KnowledgeRelatedSolutionsProps } from "./KnowledgeRelatedSolutions.types";

const SOLUTIONS_BY_SLUG = new Map(SOLUTIONS.map((solution) => [solution.slug, solution]));

/**
 * Milestone 15's Solutions integration, completing the loop Solutions'
 * own `RelatedKnowledge` started one-way — reuses the real `SolutionCard`
 * rather than a second card, the same pattern
 * `TechnologyRelatedSolutions` already established. Renders nothing when
 * `relatedSolutionSlugs` is empty — a genuine, honest state (an
 * accessibility checklist isn't "sold" as any one Solution), not an
 * error.
 */
export function KnowledgeRelatedSolutions({ article, className }: KnowledgeRelatedSolutionsProps) {
  const analytics = useAnalytics();

  if (article.relatedSolutionSlugs.length === 0) return null;

  return (
    <section id="related-solutions" className={cn("max-w-3xl space-y-4", className)}>
      <Heading variant="h3" as="h2">
        Where this shows up
      </Heading>

      <div className="grid gap-6 sm:grid-cols-2">
        {article.relatedSolutionSlugs.map((slug) => {
          const solution = SOLUTIONS_BY_SLUG.get(slug);
          if (!solution) return null;

          return (
            <SolutionCard
              key={slug}
              solution={solution}
              onSelect={(solutionSlug) =>
                analytics.track("knowledge_solution_clicked", {
                  slug: article.slug,
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
