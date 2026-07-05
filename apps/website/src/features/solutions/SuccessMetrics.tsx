import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { cn } from "@/utils/cn";

import type { SuccessMetricsProps } from "./SuccessMetrics.types";

/**
 * CLAUDE.md Part 20's Success Metrics: what "working" looks like for this
 * solution. Values are deliberately qualitative where a real number can't
 * be honestly claimed for a prospective engagement (CLAUDE.md Part 7:
 * "never invent numbers") — see `data/solutions.ts` for the authored
 * values.
 */
export function SuccessMetrics({ solution, className }: SuccessMetricsProps) {
  return (
    <section id="success-metrics" className={cn("max-w-3xl space-y-4", className)}>
      <Heading variant="h3" as="h2">
        What success looks like
      </Heading>

      <div className="grid gap-4 sm:grid-cols-2">
        {solution.successMetrics.map((metric) => (
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
