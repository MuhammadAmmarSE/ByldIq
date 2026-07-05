"use client";

import { Heading } from "@/components/Heading";
import { SOLUTIONS } from "@/features/solutions/data/solutions";
import { SolutionCard } from "@/features/solutions/SolutionCard";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { CaseStudyRelatedSolutionsProps } from "./CaseStudyRelatedSolutions.types";

const SOLUTIONS_BY_SLUG = new Map(SOLUTIONS.map((solution) => [solution.slug, solution]));

/**
 * CLAUDE.md Part 21's Related Technologies/Solutions/Articles section
 * (the Solutions half): reuses the Solutions Platform's real
 * `SolutionCard` rather than building a second card for the same content.
 * `relatedSolutionSlugs` is curated per case study (see `data/case-
 * studies.ts`), the same editorial-pairing approach the Solutions
 * Platform's own `RelatedCaseStudies` uses in the other direction — so
 * every reader lands somewhere relevant rather than at a dead end
 * (CLAUDE.md Part 8: "no page should ever become a dead end").
 */
export function CaseStudyRelatedSolutions({
  caseStudy,
  className,
}: CaseStudyRelatedSolutionsProps) {
  const analytics = useAnalytics();

  return (
    <section id="related-solutions" className={cn("space-y-4", className)}>
      <Heading variant="h3" as="h2">
        Related solutions
      </Heading>

      <div className="grid gap-6 sm:grid-cols-2">
        {caseStudy.relatedSolutionSlugs.map((slug) => {
          const solution = SOLUTIONS_BY_SLUG.get(slug);
          if (!solution) return null;

          return (
            <SolutionCard
              key={slug}
              solution={solution}
              onSelect={(solutionSlug) =>
                analytics.track("case_study_solution_clicked", {
                  slug: caseStudy.slug,
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
