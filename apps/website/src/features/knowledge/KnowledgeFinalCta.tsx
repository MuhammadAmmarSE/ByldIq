"use client";

import Link from "next/link";

import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { useAiCompanion } from "@/features/homepage/ai-companion";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { KnowledgeFinalCtaProps } from "./KnowledgeFinalCta.types";

/**
 * CLAUDE.md Part 18's final CTA — the last section of the shared article
 * page template. Offers the same two paths as the hero (BuildPath, Talk
 * to Byld) plus a way back to the rest of the platform, mirroring
 * `TechnologyFinalCta`/`SolutionFinalCta`'s "multiple next steps"
 * philosophy (Part 19) for visitors who read the whole article without
 * acting on the hero's CTA.
 */
export function KnowledgeFinalCta({ article, className }: KnowledgeFinalCtaProps) {
  const analytics = useAnalytics();
  const { open: openAiCompanion } = useAiCompanion();

  function handlePrimaryCta() {
    analytics.track("knowledge_cta_selected", { slug: article.slug, cta: "final-primary" });
    analytics.track("knowledge_buildpath_started", { slug: article.slug });
  }

  function handleTalkToByld() {
    analytics.track("knowledge_cta_selected", { slug: article.slug, cta: "final-ai" });
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
        Ready to put this into practice?
      </Heading>
      <Text variant="subtitle" className="mx-auto max-w-xl">
        BuildPath turns this into a personalized roadmap in about three minutes — or talk to Byld
        first if you still have questions.
      </Text>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Button asChild size="lg" onClick={handlePrimaryCta}>
          <Link href={`/buildpath?article=${article.slug}`}>Plan Your Roadmap</Link>
        </Button>
        <Button variant="outline" size="lg" onClick={handleTalkToByld}>
          Talk to Byld
        </Button>
      </div>
      <Text variant="caption">
        <Link href="/knowledge" className="hover:text-accent underline underline-offset-4">
          Explore the Knowledge Center
        </Link>
      </Text>
    </section>
  );
}
