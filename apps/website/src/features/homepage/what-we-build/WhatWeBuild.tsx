"use client";

import { Layers } from "lucide-react";

import { FeatureCard } from "@/components/FeatureCard";
import { SectionHeader } from "@/components/SectionHeader";
import { SOLUTION_ICONS, SOLUTIONS } from "@/features/solutions";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import type { WhatWeBuildProps } from "./WhatWeBuild.types";

/**
 * Milestone 9's "What We Build" interactive service overview. The spec
 * names seven illustrative categories (AI Products, SaaS Platforms,
 * Mobile Apps, Enterprise Systems, Shopify Solutions, Automation, AI
 * Integration) that don't correspond to any real page — building cards
 * for them would either dead-end or duplicate the real Solutions
 * platform (Milestone 4) with a second, unlinked taxonomy. Instead this
 * grid uses the real nine solutions, the same `SOLUTION_ICONS` mapping
 * `SolutionCard` uses so the icon per solution stays consistent
 * everywhere it appears.
 */
export function WhatWeBuild({ className }: WhatWeBuildProps) {
  const analytics = useAnalytics();

  return (
    <div className={cn("space-y-10", className)}>
      <SectionHeader
        eyebrow="What We Build"
        heading="Digital products, engineered end to end."
        description="From a first validated version to systems built for scale — every engagement starts with the business problem, not the technology."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SOLUTIONS.map((solution) => (
          <FeatureCard
            key={solution.slug}
            icon={SOLUTION_ICONS[solution.slug] ?? Layers}
            title={solution.navLabel}
            description={solution.heroSupportingCopy}
            href={`/solutions/${solution.slug}`}
            ctaLabel={`Explore ${solution.navLabel}`}
            className="cursor-pointer"
            onClick={() => analytics.track("what_we_build_card_clicked", { slug: solution.slug })}
          />
        ))}
      </div>
    </div>
  );
}
