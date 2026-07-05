"use client";

import { useEffect } from "react";
import Link from "next/link";

import { Breadcrumb } from "@/components/Breadcrumb";
import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { useAiCompanion } from "@/features/homepage/ai-companion";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { SolutionHeroProps } from "./SolutionHero.types";

/**
 * Every solution page's hero (CLAUDE.md Part 20): who the solution is for,
 * the headline and supporting copy, and two CTAs — BuildPath (the primary
 * path to a personalized roadmap) and the AI Companion (for visitors who
 * want to ask questions before committing to either).
 */
export function SolutionHero({ solution, className }: SolutionHeroProps) {
  const analytics = useAnalytics();
  const { open: openAiCompanion, setPageContext } = useAiCompanion();

  useEffect(() => {
    analytics.track("solution_viewed", { slug: solution.slug });
    // Fire once per mount (page view), not on every analytics client re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solution.slug]);

  useEffect(() => {
    // Makes the AI Companion's greeting acknowledge this solution if opened
    // from this page (CLAUDE.md Part 20: "AI automatically changes
    // context"), without touching the visitor's separate journey
    // preference. Cleared on unmount so leaving the page falls back to the
    // journey-based greeting rather than a stale solution reference.
    setPageContext({ label: solution.title, slug: solution.slug });
    return () => setPageContext(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solution.slug, solution.title]);

  function handlePrimaryCta() {
    analytics.track("solution_cta_selected", { slug: solution.slug, cta: "hero-primary" });
    analytics.track("solution_buildpath_started", { slug: solution.slug });
  }

  function handleTalkToByld() {
    analytics.track("solution_cta_selected", { slug: solution.slug, cta: "ai" });
    openAiCompanion();
  }

  return (
    <div className={cn("space-y-6", className)}>
      <Breadcrumb
        items={[{ label: "Solutions", href: "/solutions" }, { label: solution.navLabel }]}
      />

      <div className="max-w-3xl space-y-4">
        <Heading variant="display">{solution.heroHeadline}</Heading>
        <Text variant="subtitle">{solution.heroSupportingCopy}</Text>
        <Text variant="caption">{solution.who}</Text>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button asChild size="lg" onClick={handlePrimaryCta}>
            <Link href={`/buildpath?solution=${solution.slug}`}>{solution.primaryCtaLabel}</Link>
          </Button>
          <Button variant="outline" size="lg" onClick={handleTalkToByld}>
            Talk to Byld
          </Button>
        </div>
      </div>
    </div>
  );
}
