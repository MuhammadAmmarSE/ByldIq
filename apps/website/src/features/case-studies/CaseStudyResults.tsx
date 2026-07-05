import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { CaseStudyResultsProps } from "./CaseStudyResults.types";

/**
 * CLAUDE.md Part 21's Results section: how the approach played out, the
 * outcome, and the measurable metrics that back it up — grouped together
 * since all three describe the same thing (what actually happened), the
 * same reasoning `CaseStudyOverview` uses for Executive Summary and
 * Business Challenge. Metrics are the authored values in `data/case-
 * studies.ts` only — CLAUDE.md Part 7: "never fabricate numbers".
 */
export function CaseStudyResults({ caseStudy, className }: CaseStudyResultsProps) {
  return (
    <section id="results" className={cn("space-y-5", className)}>
      <Heading variant="h3" as="h2">
        The results
      </Heading>

      <div className="space-y-1">
        <Text variant="caption" className="font-medium">
          Approach
        </Text>
        <Text variant="body">{caseStudy.approach}</Text>
      </div>

      <div className="space-y-1">
        <Text variant="caption" className="font-medium">
          Outcome
        </Text>
        <Text variant="body">{caseStudy.outcome}</Text>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {caseStudy.metrics.map((metric) => (
          <div key={metric.label} className="border-border bg-surface-raised rounded-lg border p-4">
            <Text variant="body" className="font-semibold">
              {metric.value}
            </Text>
            <Text variant="caption" className="mt-1">
              {metric.label}
            </Text>
          </div>
        ))}
      </div>
    </section>
  );
}
