"use client";

import { Heading } from "@/components/Heading";
import { ArticleCard } from "@/features/homepage/knowledge-center-preview";
import { KNOWLEDGE_ARTICLES } from "@/features/knowledge";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { CaseStudyRelatedKnowledgeProps } from "./CaseStudyRelatedKnowledge.types";

const ARTICLES_BY_SLUG = new Map(KNOWLEDGE_ARTICLES.map((article) => [article.slug, article]));

/**
 * CLAUDE.md Part 21's Related Solutions/Articles section (the Knowledge
 * half): reuses the Knowledge Center preview's real `ArticleCard` rather
 * than building a second card for the same content, mirroring the
 * Solutions Platform's `RelatedKnowledge`. `relatedArticleSlugs` is
 * curated per case study (see `data/case-studies.ts`), not derived
 * automatically.
 */
export function CaseStudyRelatedKnowledge({
  caseStudy,
  className,
}: CaseStudyRelatedKnowledgeProps) {
  const analytics = useAnalytics();

  return (
    <section id="related-knowledge" className={cn("space-y-4", className)}>
      <Heading variant="h3" as="h2">
        Go deeper
      </Heading>

      <div className="grid gap-6 sm:grid-cols-2">
        {caseStudy.relatedArticleSlugs.map((slug) => {
          const article = ARTICLES_BY_SLUG.get(slug);
          if (!article) return null;

          return (
            <ArticleCard
              key={slug}
              article={article}
              onSelect={(articleSlug) =>
                analytics.track("case_study_article_clicked", {
                  slug: caseStudy.slug,
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
