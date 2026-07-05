"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";

import { BlueprintGrid } from "@/components/BlueprintGrid";
import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { SearchField } from "@/components/SearchField";
import { Text } from "@/components/Text";
import { useAiCompanion } from "@/features/homepage/ai-companion";
import { cn } from "@/utils/cn";

import type { WorkHeroProps } from "./WorkHero.types";

/**
 * The `/work` landing page's hero (CLAUDE.md Part 21): introduces the
 * platform's philosophy — an engineering library, not a project gallery —
 * with search, quick industry filters, an AI entry point, and a pointer to
 * the featured case study, all in one place per the spec's hero
 * requirements.
 */
export function WorkHero({
  query,
  onQueryChange,
  industries,
  industryFilter,
  onIndustryQuickFilter,
  featured,
  className,
}: WorkHeroProps) {
  const { open: openAiCompanion } = useAiCompanion();

  return (
    <div className={cn("relative overflow-hidden rounded-lg py-16 text-center", className)}>
      <BlueprintGrid className="opacity-60" />

      <div className="relative mx-auto max-w-2xl space-y-6 px-6">
        <div className="space-y-3">
          <Heading variant="display">Engineering Stories, Not Portfolios.</Heading>
          <Text variant="subtitle">
            Every project here explains the business challenge, the engineering decisions, the
            trade-offs, and the results — not just the finished screenshots.
          </Text>
        </div>

        <SearchField
          aria-label="Search case studies"
          placeholder="Search by industry, technology, or challenge..."
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          onClear={() => onQueryChange("")}
          className="mx-auto max-w-md"
        />

        <div
          className="flex flex-wrap items-center justify-center gap-2"
          role="group"
          aria-label="Quick filter by industry"
        >
          <Button
            variant={industryFilter === null ? "primary" : "outline"}
            size="sm"
            onClick={() => onIndustryQuickFilter(null)}
          >
            All industries
          </Button>
          {industries.map((industry) => (
            <Button
              key={industry.slug}
              variant={industryFilter === industry.slug ? "primary" : "outline"}
              size="sm"
              aria-pressed={industryFilter === industry.slug}
              onClick={() => onIndustryQuickFilter(industry.slug)}
            >
              {industry.label}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button variant="outline" onClick={openAiCompanion}>
            <Icon icon={Sparkles} size="sm" />
            Ask Byld which story fits your problem
          </Button>
        </div>

        {featured && (
          <Text variant="caption">
            Featured:{" "}
            <Link
              href={`/work/${featured.slug}`}
              className="hover:text-accent underline underline-offset-4"
            >
              {featured.headline}
            </Link>
          </Text>
        )}
      </div>
    </div>
  );
}
