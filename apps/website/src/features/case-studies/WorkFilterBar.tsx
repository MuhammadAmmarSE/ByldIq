"use client";

import { Select } from "@/components/Select";
import { cn } from "@/utils/cn";

import type { WorkFilterBarProps, WorkFilterOption } from "./WorkFilterBar.types";

const ALL_VALUE = "all";

function toOptions(items: WorkFilterOption[], allLabel: string) {
  return [
    { value: ALL_VALUE, label: allLabel },
    ...items.map((item) => ({ value: item.slug, label: item.label })),
  ];
}

/**
 * CLAUDE.md Part 21's `/work` filter bar: industry, technology, and
 * business challenge, plus an AI-involvement toggle — the facets that
 * meaningfully partition the real case study data. Team size, timeline,
 * and platform are shown as case study metadata but not exposed as filter
 * facets: with only a handful of real case studies, none of those fields
 * has enough natural multi-value spread to make a dropdown functional
 * rather than decorative (see `WorkFilterBar.docs.md`).
 */
export function WorkFilterBar({
  industries,
  industryFilter,
  onIndustryFilterChange,
  technologies,
  technologyFilter,
  onTechnologyFilterChange,
  businessProblems,
  businessProblemFilter,
  onBusinessProblemFilterChange,
  aiOnly,
  onAiOnlyChange,
  className,
}: WorkFilterBarProps) {
  return (
    <div className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-4", className)}>
      <Select
        aria-label="Filter by industry"
        options={toOptions(industries, "All industries")}
        value={industryFilter ?? ALL_VALUE}
        onValueChange={(value) => onIndustryFilterChange(value === ALL_VALUE ? null : value)}
      />
      <Select
        aria-label="Filter by technology"
        options={toOptions(technologies, "All technologies")}
        value={technologyFilter ?? ALL_VALUE}
        onValueChange={(value) => onTechnologyFilterChange(value === ALL_VALUE ? null : value)}
      />
      <Select
        aria-label="Filter by business challenge"
        options={toOptions(businessProblems, "All challenges")}
        value={businessProblemFilter ?? ALL_VALUE}
        onValueChange={(value) => onBusinessProblemFilterChange(value === ALL_VALUE ? null : value)}
      />
      <Select
        aria-label="Filter by AI involvement"
        options={[
          { value: ALL_VALUE, label: "All projects" },
          { value: "ai-only", label: "AI-powered only" },
        ]}
        value={aiOnly ? "ai-only" : ALL_VALUE}
        onValueChange={(value) => onAiOnlyChange(value === "ai-only")}
      />
    </div>
  );
}
