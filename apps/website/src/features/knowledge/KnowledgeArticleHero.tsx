"use client";

import { useEffect } from "react";
import Link from "next/link";

import { Badge } from "@/components/Badge";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { useAiCompanion } from "@/features/homepage/ai-companion";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { KnowledgeArticleHeroProps } from "./KnowledgeArticleHero.types";

/**
 * Every article page's hero (CLAUDE.md Part 18): a breadcrumb back to
 * `/knowledge`, the article's category/difficulty/reading time at a
 * glance, its title, its summary, and two CTAs — the same "BuildPath or AI
 * Companion" pairing `TechnologyDetailHero`/`SolutionHero`/`CaseStudyHero`
 * use. Also sets the AI Companion's `pageContext` (CLAUDE.md Part 16: "AI
 * automatically knows... current article") and links BuildPath to
 * `/buildpath?article={slug}` (Part 17: "BuildPath automatically
 * remembers... viewed case studies," applied here to articles).
 */
export function KnowledgeArticleHero({
  article,
  categoryLabel,
  className,
}: KnowledgeArticleHeroProps) {
  const analytics = useAnalytics();
  const { open: openAiCompanion, setPageContext } = useAiCompanion();

  useEffect(() => {
    analytics.track("knowledge_viewed", { slug: article.slug });
    // Fire once per mount (page view), not on every analytics client re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article.slug]);

  useEffect(() => {
    // Cleared on unmount so leaving the page falls back to the
    // journey-based greeting rather than a stale article reference.
    setPageContext({ label: article.title, slug: article.slug });
    return () => setPageContext(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article.slug, article.title]);

  function handlePrimaryCta() {
    analytics.track("knowledge_cta_selected", { slug: article.slug, cta: "hero-primary" });
    analytics.track("knowledge_buildpath_started", { slug: article.slug });
  }

  function handleTalkToByld() {
    analytics.track("knowledge_cta_selected", { slug: article.slug, cta: "ai" });
    openAiCompanion();
  }

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

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button size="lg" onClick={handlePrimaryCta} asChild>
            <Link href={`/buildpath?article=${article.slug}`}>Plan Your Roadmap</Link>
          </Button>
          <Button variant="outline" size="lg" onClick={handleTalkToByld}>
            Talk to Byld
          </Button>
        </div>
      </div>
    </div>
  );
}
