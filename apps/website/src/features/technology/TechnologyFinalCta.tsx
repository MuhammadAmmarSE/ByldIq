"use client";

import Link from "next/link";

import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { useAiCompanion } from "@/features/homepage/ai-companion";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { TechnologyFinalCtaProps } from "./TechnologyFinalCta.types";

/**
 * CLAUDE.md Part 22's final CTA — the last section of the shared
 * technology page template. Offers the same two paths as the hero
 * (BuildPath, Talk to Byld) plus a way back to the rest of the platform,
 * mirroring `SolutionFinalCta`'s "multiple next steps" philosophy (Part
 * 19) for visitors who read the whole page without acting on the hero's
 * CTA.
 */
export function TechnologyFinalCta({ technology, className }: TechnologyFinalCtaProps) {
  const analytics = useAnalytics();
  const { open: openAiCompanion } = useAiCompanion();

  function handlePrimaryCta() {
    analytics.track("technology_cta_selected", { slug: technology.slug, cta: "final-primary" });
    analytics.track("technology_buildpath_started", { slug: technology.slug });
  }

  function handleTalkToByld() {
    analytics.track("technology_cta_selected", { slug: technology.slug, cta: "final-ai" });
    openAiCompanion();
  }

  return (
    <section
      id="get-started"
      className={cn(
        "border-border bg-surface-raised space-y-4 rounded-lg border p-8 text-center",
        className,
      )}
    >
      <Heading variant="h3" as="h2">
        Ready to see if {technology.name} fits?
      </Heading>
      <Text variant="subtitle" className="mx-auto max-w-xl">
        BuildPath turns this into a personalized roadmap in about three minutes — or talk to Byld
        first if you still have questions.
      </Text>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Button asChild size="lg" onClick={handlePrimaryCta}>
          <Link href={`/buildpath?technology=${technology.slug}`}>Plan Your Roadmap</Link>
        </Button>
        <Button variant="outline" size="lg" onClick={handleTalkToByld}>
          Talk to Byld
        </Button>
      </div>
      <Text variant="caption">
        <Link href="/technology" className="hover:text-accent underline underline-offset-4">
          Explore other technologies
        </Link>
      </Text>
    </section>
  );
}
