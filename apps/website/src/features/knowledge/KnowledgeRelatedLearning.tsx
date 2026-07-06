"use client";

import { Heading } from "@/components/Heading";
import { ArticleCard } from "@/features/homepage/knowledge-center-preview";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { KNOWLEDGE_ARTICLES } from "./data/articles";
import { CATEGORIES_BY_SLUG } from "./data/facets";
import type { KnowledgeRelatedLearningProps } from "./KnowledgeRelatedLearning.types";

const ARTICLES_BY_SLUG = new Map(
  KNOWLEDGE_ARTICLES.map((candidate) => [candidate.slug, candidate]),
);

/**
 * CLAUDE.md Part 18's Related Learning section (the article template's
 * eleventh and final section): reuses the Knowledge Center preview's real
 * `ArticleCard` rather than building a second card for the same content —
 * the same "one card, not two" reuse `TechnologyRelatedKnowledge` follows.
 * Renders nothing when `relatedArticleSlugs` is empty — a genuine,
 * intentional state (three of the five real articles have none).
 */
export function KnowledgeRelatedLearning({ article, className }: KnowledgeRelatedLearningProps) {
  const analytics = useAnalytics();

  if (article.relatedArticleSlugs.length === 0) return null;

  return (
    <section id="related-learning" className={cn("max-w-3xl space-y-4", className)}>
      <Heading variant="h3" as="h2">
        Related learning
      </Heading>

      <div className="grid gap-6 sm:grid-cols-2">
        {article.relatedArticleSlugs.map((slug) => {
          const related = ARTICLES_BY_SLUG.get(slug);
          if (!related) return null;

          return (
            <ArticleCard
              key={slug}
              article={related}
              categoryLabel={CATEGORIES_BY_SLUG.get(related.category)?.label}
              onSelect={(relatedSlug) =>
                analytics.track("knowledge_related_article_clicked", {
                  slug: article.slug,
                  relatedSlug,
                })
              }
            />
          );
        })}
      </div>
    </section>
  );
}
