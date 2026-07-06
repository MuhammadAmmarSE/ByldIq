"use client";

import { useEffect } from "react";

import { Badge } from "@/components/Badge";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { KnowledgeArticleHeroProps } from "./KnowledgeArticleHero.types";

/**
 * Every article page's hero (CLAUDE.md Part 18): a breadcrumb back to
 * `/knowledge`, the article's category/difficulty/reading time at a
 * glance, its title, and its summary — the same shape as the Technology
 * Explorer's `TechnologyDetailHero`, minus the AI/BuildPath CTAs a later
 * phase of this milestone adds.
 */
export function KnowledgeArticleHero({
  article,
  categoryLabel,
  className,
}: KnowledgeArticleHeroProps) {
  const analytics = useAnalytics();

  useEffect(() => {
    analytics.track("knowledge_viewed", { slug: article.slug });
    // Fire once per mount (page view), not on every analytics client re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article.slug]);

  return (
    <div className={cn("space-y-6", className)}>
      <Breadcrumb items={[{ label: "Knowledge", href: "/knowledge" }, { label: article.title }]} />

      <div className="max-w-3xl space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {categoryLabel ? <Badge variant="neutral">{categoryLabel}</Badge> : null}
          <Badge variant="outline">{article.difficulty}</Badge>
          <Badge variant="outline">{article.readingTime}</Badge>
        </div>

        <Heading variant="display">{article.title}</Heading>
        <Text variant="subtitle">{article.summary}</Text>
      </div>
    </div>
  );
}
