"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { useAiCompanion } from "@/features/homepage/ai-companion";
import { CalendarPreview } from "@/features/homepage/conversion-experience";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { SolutionFinalCtaProps } from "./SolutionFinalCta.types";

/**
 * CLAUDE.md Part 20's final CTA — the last section of the shared solution
 * page template. Offers three real next steps (BuildPath, Book Discovery,
 * Talk to Byld) plus a way back to the other solutions, per Part 19's
 * philosophy of multiple next steps rather than a single forced action,
 * for visitors who read the whole page without acting on the hero's CTA.
 *
 * Milestone 10's spec also names "Contact Sales" as a fourth path — not
 * added as a separate CTA. CLAUDE.md's brand voice explicitly avoids
 * sales framing throughout (Part 16: "Byld AI is NOT... Sales"), and
 * "Book Discovery" already is the site's real human-conversation path in
 * that voice; a second, differently-worded button pointing at the same
 * outcome would be redundant, not a genuine fourth option.
 */
export function SolutionFinalCta({ solution, className }: SolutionFinalCtaProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const analytics = useAnalytics();
  const { open: openAiCompanion } = useAiCompanion();

  function handlePrimaryCta() {
    analytics.track("solution_cta_selected", { slug: solution.slug, cta: "final-primary" });
    analytics.track("solution_buildpath_started", { slug: solution.slug });
  }

  function handleBookDiscovery() {
    analytics.track("solution_cta_selected", { slug: solution.slug, cta: "final-discovery" });
    setShowCalendar(true);
  }

  function handleTalkToByld() {
    analytics.track("solution_cta_selected", { slug: solution.slug, cta: "final-ai" });
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
        Ready to think this through?
      </Heading>
      <Text variant="subtitle" className="mx-auto max-w-xl">
        BuildPath turns this into a personalized roadmap in about three minutes, book a discovery
        call with our team, or talk to Byld first if you still have questions.
      </Text>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Button asChild size="lg" onClick={handlePrimaryCta}>
          <Link href={`/buildpath?solution=${solution.slug}`}>{solution.primaryCtaLabel}</Link>
        </Button>
        <Button variant="outline" size="lg" onClick={handleBookDiscovery}>
          Book Discovery
        </Button>
        <Button variant="outline" size="lg" onClick={handleTalkToByld}>
          Talk to Byld
        </Button>
      </div>
      {showCalendar && <CalendarPreview className="mx-auto max-w-md" />}
      <Text variant="caption">
        <Link href="/solutions" className="hover:text-accent underline underline-offset-4">
          Explore other solutions
        </Link>
      </Text>
    </section>
  );
}
