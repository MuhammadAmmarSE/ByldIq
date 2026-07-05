"use client";

import { Heading } from "@/components/Heading";
import { ArticleCard, KNOWLEDGE_ARTICLES } from "@/features/homepage/knowledge-center-preview";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { RelatedKnowledgeProps } from "./RelatedKnowledge.types";

const ARTICLES_BY_SLUG = new Map(KNOWLEDGE_ARTICLES.map((article) => [article.slug, article]));

/**
 * CLAUDE.md Part 20's Knowledge Integration: reuses the Knowledge Center
 * preview's real `ArticleCard` rather than building a second card for the
 * same content. `relatedArticleSlugs` is curated per solution (see
 * `data/solutions.ts`), not derived automatically.
 */
export function RelatedKnowledge({ solution, className }: RelatedKnowledgeProps) {
  const analytics = useAnalytics();

  return (
    <section id="related-knowledge" className={cn("max-w-3xl space-y-4", className)}>
      <Heading variant="h3" as="h2">
        Go deeper
      </Heading>

      <div className="grid gap-6 sm:grid-cols-2">
        {solution.relatedArticleSlugs.map((slug) => {
          const article = ARTICLES_BY_SLUG.get(slug);
          if (!article) return null;

          return (
            <ArticleCard
              key={slug}
              article={article}
              onSelect={(articleSlug) =>
                analytics.track("solution_article_clicked", {
                  slug: solution.slug,
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
