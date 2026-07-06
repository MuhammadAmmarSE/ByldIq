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

import type { TechnologyDetailHeroProps } from "./TechnologyDetailHero.types";

/**
 * Every technology page's hero (CLAUDE.md Part 22): a breadcrumb back to
 * `/technology`, the technology's name and tagline, its category/maturity/
 * learning-curve at a glance, who benefits from it, and two CTAs — the
 * same "BuildPath or AI Companion" pairing `SolutionHero`/`CaseStudyHero`
 * use. Also sets the AI Companion's `pageContext` (CLAUDE.md Part 22: "AI
 * automatically changes context... Visitors never repeat themselves") and
 * links BuildPath to `/buildpath?technology={slug}` (Part 22: "BuildPath
 * automatically remembers explored technologies").
 */
export function TechnologyDetailHero({
  technology,
  categoryLabel,
  className,
}: TechnologyDetailHeroProps) {
  const analytics = useAnalytics();
  const { open: openAiCompanion, setPageContext } = useAiCompanion();

  useEffect(() => {
    analytics.track("technology_viewed", { slug: technology.slug });
    // Fire once per mount (page view), not on every analytics client re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [technology.slug]);

  useEffect(() => {
    // Cleared on unmount so leaving the page falls back to the
    // journey-based greeting rather than a stale technology reference.
    setPageContext({ label: technology.name, slug: technology.slug });
    return () => setPageContext(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [technology.slug, technology.name]);

  function handlePrimaryCta() {
    analytics.track("technology_cta_selected", { slug: technology.slug, cta: "hero-primary" });
    analytics.track("technology_buildpath_started", { slug: technology.slug });
  }

  function handleTalkToByld() {
    analytics.track("technology_cta_selected", { slug: technology.slug, cta: "ai" });
    openAiCompanion();
  }

  return (
    <div className={cn("space-y-6", className)}>
      <Breadcrumb
        items={[{ label: "Technology", href: "/technology" }, { label: technology.name }]}
      />

      <div className="max-w-3xl space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {categoryLabel ? <Badge variant="neutral">{categoryLabel}</Badge> : null}
          <Badge variant="outline">{technology.maturity}</Badge>
          <Badge variant="outline">{technology.learningCurve} learning curve</Badge>
        </div>

        <Heading variant="display">{technology.name}</Heading>
        <Text variant="subtitle">{technology.tagline}</Text>
        <Text variant="caption">{technology.whoBenefits}</Text>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button asChild size="lg" onClick={handlePrimaryCta}>
            <Link href={`/buildpath?technology=${technology.slug}`}>Plan Your Roadmap</Link>
          </Button>
          <Button variant="outline" size="lg" onClick={handleTalkToByld}>
            Talk to Byld
          </Button>
        </div>
      </div>
    </div>
  );
}
