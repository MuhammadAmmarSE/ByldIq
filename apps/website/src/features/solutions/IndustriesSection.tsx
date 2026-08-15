"use client";

import Link from "next/link";

import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { useAnalytics } from "@/providers/AnalyticsProvider";
import { cn } from "@/utils/cn";

import "./analytics";

import { INDUSTRIES } from "./data/industries";
import type { IndustriesSectionProps } from "./IndustriesSection.types";

/**
 * Milestone 10's Industries section: a card per industry linking to
 * `/solutions/industry/{slug}` (mirroring `/work/industry/[industry]`),
 * summarizing what the detail page expands on — typical challenges,
 * recommended solutions, and example case studies where a real one
 * exists (`data/industries.ts`).
 */
export function IndustriesSection({ className }: IndustriesSectionProps) {
  const analytics = useAnalytics();

  return (
    <div className={cn("space-y-6", className)}>
      <div className="space-y-2">
        <Heading variant="h2">Industries we build for.</Heading>
        <Text variant="subtitle">
          Every industry has its own constraints — here&apos;s what we typically see, and where to
          start.
        </Text>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {INDUSTRIES.map((industry) => (
          <Link
            key={industry.slug}
            href={`/solutions/industry/${industry.slug}`}
            onClick={() => analytics.track("industry_card_clicked", { slug: industry.slug })}
            className="border-border bg-surface hover:border-accent/50 focus-visible:ring-focus-ring flex flex-col gap-2 rounded-lg border p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <Heading variant="h5" as="h3">
              {industry.label}
            </Heading>
            <Text variant="body" className="text-muted line-clamp-2">
              {industry.description}
            </Text>
          </Link>
        ))}
      </div>
    </div>
  );
}
