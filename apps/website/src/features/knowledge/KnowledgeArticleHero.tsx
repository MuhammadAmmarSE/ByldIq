"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { Alert } from "@/components/Alert";
import { Badge } from "@/components/Badge";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { ShareButton } from "@/components/ShareButton";
import { Text } from "@/components/Text";
import { siteConfig } from "@/config/site";
import { useAiCompanion } from "@/features/homepage/ai-companion";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { useAppStore } from "@/providers/StoreProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { buildKnowledgeArticleGroundedReplies } from "./groundedReplies";
import { KnowledgeBookmarkButton } from "./KnowledgeBookmarkButton";
import type { KnowledgeArticleHeroProps } from "./KnowledgeArticleHero.types";

/** Below this, resuming isn't meaningfully different from just starting over. */
const MIN_RESUMABLE_PERCENT = 5;
/** Above this, the visitor already finished — nothing to resume. */
const MAX_RESUMABLE_PERCENT = 95;

/**
 * Every article page's hero (CLAUDE.md Part 18): a breadcrumb back to
 * `/knowledge`, the article's category/difficulty/reading time at a
 * glance, its title, its summary, and its CTAs — "Plan Your Roadmap"/"Talk
 * to Byld" (the same pairing `TechnologyDetailHero`/`SolutionHero`/
 * `CaseStudyHero` use) plus `KnowledgeBookmarkButton`. Also sets the AI
 * Companion's `pageContext` (CLAUDE.md Part 16: "AI automatically
 * knows... current article") and links BuildPath to
 * `/buildpath?article={slug}` (Part 17: "BuildPath automatically
 * remembers... viewed case studies," applied here to articles).
 *
 * Also mounts `ReadingProgressBar` here (not the page) so its
 * `onComplete` can fire `knowledge_article_completed` — the same
 * `CaseStudyHero` pattern this platform's `ReadingProgressBar` was
 * promoted from. A `ShareButton` sits next to the other CTAs, and a
 * "jump back in" banner offers to resume a previous visit's scroll
 * position (CLAUDE.md Part 18/23: "Allow visitors to return to where
 * they stopped") — the current percentage is only written once, on
 * unmount, rather than on every scroll tick.
 */
export function KnowledgeArticleHero({
  article,
  categoryLabel,
  className,
}: KnowledgeArticleHeroProps) {
  const analytics = useAnalytics();
  const { open: openAiCompanion, setPageContext } = useAiCompanion();
  const currentPercent = useReadingProgress();
  const currentPercentRef = useRef(currentPercent);
  currentPercentRef.current = currentPercent;
  const savedPercent = useAppStore((state) => state.readingProgressBySlug[article.slug]);
  const setReadingProgress = useAppStore((state) => state.setReadingProgress);
  const [resumeDismissed, setResumeDismissed] = useState(false);

  useEffect(() => {
    analytics.track("knowledge_viewed", { slug: article.slug });
    // Fire once per mount (page view), not on every analytics client re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article.slug]);

  useEffect(() => {
    // Cleared on unmount so leaving the page falls back to the
    // journey-based greeting rather than a stale article reference.
    setPageContext({
      label: article.title,
      slug: article.slug,
      groundedReplies: buildKnowledgeArticleGroundedReplies(article),
    });
    return () => setPageContext(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article.slug, article.title]);

  useEffect(() => {
    return () => setReadingProgress(article.slug, currentPercentRef.current);
  }, [article.slug, setReadingProgress]);

  function handlePrimaryCta() {
    analytics.track("knowledge_cta_selected", { slug: article.slug, cta: "hero-primary" });
    analytics.track("knowledge_buildpath_started", { slug: article.slug });
  }

  function handleTalkToByld() {
    analytics.track("knowledge_cta_selected", { slug: article.slug, cta: "ai" });
    openAiCompanion();
  }

  function handleShare() {
    analytics.track("knowledge_shared", { slug: article.slug });
  }

  function handleReadingCompleted() {
    analytics.track("knowledge_article_completed", { slug: article.slug });
  }

  function handleJumpBackIn() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: (percentToResume / 100) * scrollableHeight, behavior: "smooth" });
    analytics.track("knowledge_reading_resumed", { slug: article.slug, percent: percentToResume });
    setResumeDismissed(true);
  }

  const percentToResume = savedPercent ?? 0;
  const showResumeBanner =
    !resumeDismissed &&
    percentToResume >= MIN_RESUMABLE_PERCENT &&
    percentToResume <= MAX_RESUMABLE_PERCENT;

  return (
    <div className={cn("space-y-6", className)}>
      <ReadingProgressBar onComplete={handleReadingCompleted} />
      <Breadcrumb items={[{ label: "Knowledge", href: "/knowledge" }, { label: article.title }]} />

      {showResumeBanner && (
        <Alert variant="info" title="Welcome back">
          <div className="flex flex-wrap items-center gap-3">
            <Text variant="body">You were {percentToResume}% through this article.</Text>
            <Button size="sm" variant="outline" onClick={handleJumpBackIn}>
              Jump back in
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setResumeDismissed(true)}>
              Dismiss
            </Button>
          </div>
        </Alert>
      )}

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
          <KnowledgeBookmarkButton slug={article.slug} />
          <ShareButton
            title={article.title}
            url={`${siteConfig.url}/knowledge/${article.slug}`}
            onShare={handleShare}
          />
        </div>
      </div>
    </div>
  );
}
