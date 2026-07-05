"use client";

import Link from "next/link";

import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { useAiCompanion } from "@/features/homepage/ai-companion";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { CaseStudyFinalCtaProps } from "./CaseStudyFinalCta.types";

/**
 * CLAUDE.md Part 21's final CTA — the last section of the shared case
 * study template. Offers the same two paths as `CaseStudyHero`
 * (BuildPath, Talk to Byld) plus a way back to the rest of the library,
 * per CLAUDE.md Part 19's philosophy of multiple next steps rather than a
 * single forced action, for visitors who read the whole story without
 * acting on the hero's CTA.
 */
export function CaseStudyFinalCta({ caseStudy, className }: CaseStudyFinalCtaProps) {
  const analytics = useAnalytics();
  const { open: openAiCompanion } = useAiCompanion();

  function handlePrimaryCta() {
    analytics.track("case_study_cta_selected", { slug: caseStudy.slug, cta: "final-primary" });
    analytics.track("case_study_buildpath_started", { slug: caseStudy.slug });
  }

  function handleTalkToByld() {
    analytics.track("case_study_cta_selected", { slug: caseStudy.slug, cta: "final-ai" });
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
        Facing a similar challenge?
      </Heading>
      <Text variant="subtitle" className="mx-auto max-w-xl">
        BuildPath turns your version of this problem into a personalized roadmap in about three
        minutes — or talk to Byld first if you still have questions.
      </Text>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Button asChild size="lg" onClick={handlePrimaryCta}>
          <Link href={`/buildpath?caseStudy=${caseStudy.slug}`}>Plan a similar project</Link>
        </Button>
        <Button variant="outline" size="lg" onClick={handleTalkToByld}>
          Talk to Byld
        </Button>
      </div>
      <Text variant="caption">
        <Link href="/work" className="hover:text-accent underline underline-offset-4">
          Explore more engineering stories
        </Link>
      </Text>
    </section>
  );
}
