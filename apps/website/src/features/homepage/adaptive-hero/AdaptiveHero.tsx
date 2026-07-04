"use client";

import { motion } from "motion/react";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { useJourneyContent } from "@/features/homepage/shared";
import { fade, staggerContainer, staggerItem } from "@/lib/motion-variants";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { useAppStore } from "@/providers/StoreProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { AdaptiveHeroProps } from "./AdaptiveHero.types";
import { HERO_CONTENT } from "./data/hero-content";
import { HeroProductPreview } from "./HeroProductPreview";

/**
 * CLAUDE.md Part 11's Adaptive Value Proposition Engine: headline, copy,
 * CTAs, trust indicators, and product preview all swap instantly with the
 * visitor's selected journey (via `useJourneyContent`), with no page
 * reload — Journey Selection (Phase 2) and this component share the same
 * store subscription.
 */
export function AdaptiveHero({ className }: AdaptiveHeroProps) {
  const content = useJourneyContent(HERO_CONTENT);
  const journey = useAppStore((state) => state.journey);
  const analytics = useAnalytics();

  function handleCtaClick(cta: "primary" | "secondary", label: string) {
    analytics.track("hero_cta_clicked", { journey, cta, label });
  }

  return (
    <div
      className={cn(
        "grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center",
        className,
      )}
    >
      <motion.div
        key={journey}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={staggerItem}>
          <Heading variant="display">{content.headline}</Heading>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Text variant="subtitle">{content.supportingCopy}</Text>
        </motion.div>

        <motion.div variants={staggerItem} className="flex flex-wrap gap-3">
          <Button
            asChild
            size="lg"
            onClick={() => handleCtaClick("primary", content.primaryCta.label)}
          >
            <a href={content.primaryCta.href}>{content.primaryCta.label}</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            onClick={() => handleCtaClick("secondary", content.secondaryCta.label)}
          >
            <a href={content.secondaryCta.href}>{content.secondaryCta.label}</a>
          </Button>
        </motion.div>

        <motion.div variants={staggerItem} className="flex flex-wrap gap-2 pt-2">
          {content.trustIndicators.map((indicator) => (
            <Badge key={indicator} variant="neutral">
              {indicator}
            </Badge>
          ))}
        </motion.div>
      </motion.div>

      <motion.div key={`${journey}-preview`} variants={fade} initial="hidden" animate="visible">
        <HeroProductPreview content={content} />
      </motion.div>
    </div>
  );
}
