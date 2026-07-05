"use client";

import Link from "next/link";

import { BlueprintGrid } from "@/components/BlueprintGrid";
import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { useAiCompanion } from "@/features/homepage/ai-companion";
import { useJourneyContent } from "@/features/homepage/shared";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { useAppStore } from "@/providers/StoreProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { getRecommendedSolution } from "./data/solutions";
import { SOLUTIONS_HERO_CONTENT } from "./data/hero-content";
import type { SolutionsHeroProps } from "./SolutionsHero.types";

/**
 * The Solutions landing page hero (CLAUDE.md Part 20): journey-aware
 * messaging, a context-aware primary CTA (the recommended solution once a
 * journey is known, otherwise a nudge toward the selector below), and an
 * AI entry point that opens the same Byld Companion available everywhere
 * else on the site.
 */
export function SolutionsHero({ className }: SolutionsHeroProps) {
  const journey = useAppStore((state) => state.journey);
  const content = useJourneyContent(SOLUTIONS_HERO_CONTENT);
  const recommended = getRecommendedSolution(journey);
  const analytics = useAnalytics();
  const { open: openAiCompanion } = useAiCompanion();

  function handlePrimaryCtaClick() {
    analytics.track("solution_cta_selected", {
      slug: recommended?.slug ?? "none",
      cta: "hero-primary",
    });
  }

  function handleTalkToByld() {
    analytics.track("solution_cta_selected", { slug: recommended?.slug ?? "none", cta: "ai" });
    openAiCompanion();
  }

  return (
    <div className={cn("relative overflow-hidden rounded-lg py-16 text-center", className)}>
      <BlueprintGrid className="opacity-60" />

      <div className="relative mx-auto max-w-2xl space-y-4 px-6">
        <Heading variant="display">{content.headline}</Heading>
        <Text variant="subtitle">{content.supportingCopy}</Text>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button asChild size="lg" onClick={handlePrimaryCtaClick}>
            <Link href={recommended ? `/solutions/${recommended.slug}` : "#solution-selector"}>
              {recommended ? `Explore ${recommended.navLabel}` : "Browse solutions"}
            </Link>
          </Button>
          <Button variant="outline" size="lg" onClick={handleTalkToByld}>
            Talk to Byld
          </Button>
        </div>
      </div>
    </div>
  );
}
