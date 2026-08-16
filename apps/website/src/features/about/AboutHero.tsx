"use client";

import { useEffect } from "react";
import { Sparkles } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

import { BlueprintGrid } from "@/components/BlueprintGrid";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { useAiCompanion } from "@/features/homepage/ai-companion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { float } from "@/lib/motion-variants";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { AboutHeroProps } from "./AboutHero.types";

/**
 * CLAUDE.md Milestone 13 §2's Hero: the philosophy stated immediately,
 * before any proof — "We build software with intention," CLAUDE.md's own
 * internal motto (Part 1). The decorative orb reuses the AI Companion's
 * own visual identity (a `Sparkles` mark in an accent circle, per
 * `AiCompanionTrigger`) rather than inventing a separate mascot
 * illustration — CLAUDE.md Part 28's brand-asset governance applies the
 * same discipline here: one consistent mark, not a new one per page.
 * `float` gives it the "subtle architectural animation" the spec asks for
 * without exaggeration (Part 6: "Never exaggerated").
 */
export function AboutHero({ className }: AboutHeroProps) {
  const analytics = useAnalytics();
  const { open: openAiCompanion, setPageContext } = useAiCompanion();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    analytics.track("about_viewed", {});
    // Fire once per mount (page view), not on every analytics client re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // CLAUDE.md Part 16: "AI automatically changes context" — the same
    // pattern SolutionHero/CaseStudyHero use, without touching the
    // visitor's separate journey preference.
    setPageContext({ label: "the About page", slug: "about" });
    return () => setPageContext(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handlePrimaryCta() {
    analytics.track("about_cta_selected", { cta: "hero-buildpath" });
    analytics.track("about_buildpath_started", {});
  }

  function handleTalkToByld() {
    analytics.track("about_cta_selected", { cta: "ai" });
    openAiCompanion();
  }

  return (
    <div className={cn("relative isolate overflow-hidden", className)}>
      <BlueprintGrid className="opacity-60" />

      <motion.div
        aria-hidden="true"
        className="bg-accent/10 absolute top-8 right-0 -z-10 size-64 rounded-full blur-3xl sm:size-80"
        variants={reducedMotion ? undefined : float}
        animate={reducedMotion ? undefined : "floating"}
      />

      <div className="relative space-y-6 py-4">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />

        <div className="max-w-3xl space-y-5">
          <span className="bg-accent/10 text-accent inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium">
            <Icon icon={Sparkles} size="sm" />
            Byld IQ
          </span>

          <Heading variant="display">We build software with intention.</Heading>

          <Text variant="subtitle">
            Byld IQ combines product thinking, design, engineering, and technology strategy to build
            software that creates measurable business value — not just software that ships.
          </Text>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button asChild size="lg" onClick={handlePrimaryCta}>
              <Link href="/buildpath">Start BuildPath</Link>
            </Button>
            <Button variant="outline" size="lg" onClick={handleTalkToByld}>
              Talk to Byld
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
