import { ArrowRight } from "lucide-react";

import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { Text } from "@/components/Text";
import { parseBeforeAfter } from "@/utils/before-after";
import { cn } from "@/utils/cn";

import type { CaseStudyBeforeAfterProps } from "./CaseStudyBeforeAfter.types";

/**
 * CLAUDE.md Part 12's Before/After section — sourced entirely from
 * `metrics[].value` strings that already encode a transition (e.g. "2
 * days -> 12 min"), via `parseBeforeAfter`, rather than a new
 * "before baseline" field. "Never invent measurements" applies just as
 * much to inventing a starting point for a real ending metric as it does
 * to inventing the metric itself — most case studies only have delta
 * metrics ("+17%"), not recorded before/after pairs, so this renders
 * nothing for those rather than manufacturing one.
 */
export function CaseStudyBeforeAfter({ caseStudy, className }: CaseStudyBeforeAfterProps) {
  const comparisons = caseStudy.metrics
    .map((metric) => {
      const pair = parseBeforeAfter(metric.value);
      return pair ? { label: metric.label, ...pair } : null;
    })
    .filter((comparison) => comparison !== null);

  if (comparisons.length === 0) return null;

  return (
    <section id="before-after" className={cn("space-y-4", className)}>
      <Heading variant="h3" as="h2">
        Before and after
      </Heading>

      <div className="grid gap-4 sm:grid-cols-2">
        {comparisons.map((comparison) => (
          <div
            key={comparison.label}
            className="border-border bg-surface-raised space-y-3 rounded-lg border p-4"
          >
            <Text variant="caption" className="font-medium">
              {comparison.label}
            </Text>
            <div className="flex items-center gap-3">
              <div className="flex-1 space-y-1">
                <Text variant="caption" className="text-muted">
                  Before
                </Text>
                <Text variant="body" className="font-semibold">
                  {comparison.before}
                </Text>
              </div>
              <Icon icon={ArrowRight} size="sm" className="text-muted shrink-0" />
              <div className="flex-1 space-y-1">
                <Text variant="caption" className="text-muted">
                  After
                </Text>
                <Text variant="body" className="text-foreground font-semibold">
                  {comparison.after}
                </Text>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
