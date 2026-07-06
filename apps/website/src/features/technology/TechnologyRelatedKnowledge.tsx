"use client";

import { Heading } from "@/components/Heading";
import { ArticleCard } from "@/features/homepage/knowledge-center-preview";
import { KNOWLEDGE_ARTICLES } from "@/features/knowledge";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { TechnologyRelatedKnowledgeProps } from "./TechnologyRelatedKnowledge.types";

const ARTICLES_BY_SLUG = new Map(KNOWLEDGE_ARTICLES.map((article) => [article.slug, article]));

/**
 * CLAUDE.md Part 22's Knowledge Integration: reuses the Knowledge
 * Center preview's real `ArticleCard` rather than building a second card
 * for the same content. Renders nothing when `relatedArticleSlugs` is
 * empty — see `TechnologyRelatedSolutions.docs.md`.
 */
export function TechnologyRelatedKnowledge({
  technology,
  className,
}: TechnologyRelatedKnowledgeProps) {
  const analytics = useAnalytics();

  if (technology.relatedArticleSlugs.length === 0) return null;

  return (
    <section id="related-knowledge" className={cn("max-w-3xl space-y-4", className)}>
      <Heading variant="h3" as="h2">
        Go deeper
      </Heading>

      <div className="grid gap-6 sm:grid-cols-2">
        {technology.relatedArticleSlugs.map((slug) => {
          const article = ARTICLES_BY_SLUG.get(slug);
          if (!article) return null;

          return (
            <ArticleCard
              key={slug}
              article={article}
              onSelect={(articleSlug) =>
                analytics.track("technology_article_clicked", {
                  slug: technology.slug,
                  articleSlug,
                })
              }
            />
          );
        })}
      </div>
    </section>
  );
}
