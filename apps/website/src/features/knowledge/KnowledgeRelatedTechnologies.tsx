"use client";

import { Heading } from "@/components/Heading";
import {
  CATEGORIES_BY_SLUG as TECHNOLOGY_CATEGORIES_BY_SLUG,
  TECHNOLOGIES,
  TechnologyCard,
} from "@/features/technology";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { KnowledgeRelatedTechnologiesProps } from "./KnowledgeRelatedTechnologies.types";

const TECHNOLOGIES_BY_SLUG = new Map(
  TECHNOLOGIES.map((technology) => [technology.slug, technology]),
);

/**
 * CLAUDE.md Part 18's Related Technologies section: reuses the Technology
 * Explorer's real `TechnologyCard` rather than building a second card for
 * the same content, mirroring `TechnologyRelatedSolutions`'s reuse of
 * `SolutionCard`. Renders nothing when `relatedTechnologySlugs` is empty —
 * a genuine, intentional state for this platform, not an error.
 */
export function KnowledgeRelatedTechnologies({
  article,
  className,
}: KnowledgeRelatedTechnologiesProps) {
  const analytics = useAnalytics();

  if (article.relatedTechnologySlugs.length === 0) return null;

  return (
    <section id="related-technologies" className={cn("max-w-3xl space-y-4", className)}>
      <Heading variant="h3" as="h2">
        Related technologies
      </Heading>

      <div className="grid gap-6 sm:grid-cols-2">
        {article.relatedTechnologySlugs.map((slug) => {
          const technology = TECHNOLOGIES_BY_SLUG.get(slug);
          if (!technology) return null;

          return (
            <TechnologyCard
              key={slug}
              technology={technology}
              categoryLabel={TECHNOLOGY_CATEGORIES_BY_SLUG.get(technology.category)?.label}
              onSelect={(technologySlug) =>
                analytics.track("knowledge_technology_clicked", {
                  slug: article.slug,
                  technologySlug,
                })
              }
            />
          );
        })}
      </div>
    </section>
  );
}
