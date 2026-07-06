"use client";

import { Heading } from "@/components/Heading";
import { KNOWLEDGE_ARTICLES } from "@/features/knowledge";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { ArticleCard } from "./ArticleCard";
import { FeaturedGuideCard } from "./FeaturedGuideCard";
import type { KnowledgeCenterPreviewProps } from "./KnowledgeCenterPreview.types";

/**
 * CLAUDE.md Part 18's Knowledge Center, previewed on the homepage: one
 * featured guide plus a grid of articles spanning strategy, architecture,
 * AI, accessibility, and commerce — each with an "Ask Byld" expandable
 * summary. `KNOWLEDGE_ARTICLES` moved to `features/knowledge/` in
 * Milestone 7 once the full platform became a second real consumer
 * (alongside Solutions/Case Studies/Technology's `RelatedKnowledge`
 * components) — the same "promote only after multiple real use cases"
 * move Milestone 5 made for `CASE_STUDIES`.
 */
export function KnowledgeCenterPreview({ className }: KnowledgeCenterPreviewProps) {
  const analytics = useAnalytics();
  const featured = KNOWLEDGE_ARTICLES.find((article) => article.featured);
  const rest = KNOWLEDGE_ARTICLES.filter((article) => !article.featured);

  function handleSelect(slug: string) {
    analytics.track("knowledge_article_clicked", { slug });
  }

  function handleExpandAiSummary(slug: string) {
    analytics.track("knowledge_ai_summary_expanded", { slug });
  }

  return (
    <div className={cn("space-y-8", className)}>
      {/* Headline option from CLAUDE.md Part 18. */}
      <Heading variant="h2">Engineering Knowledge That Lasts.</Heading>

      {featured && <FeaturedGuideCard article={featured} onSelect={handleSelect} />}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {rest.map((article) => (
          <ArticleCard
            key={article.slug}
            article={article}
            onSelect={handleSelect}
            onExpandAiSummary={handleExpandAiSummary}
          />
        ))}
      </div>
    </div>
  );
}
