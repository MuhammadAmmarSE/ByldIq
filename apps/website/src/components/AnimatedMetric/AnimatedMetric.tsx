import { AnimatedMetricValue } from "@/components/AnimatedMetricValue";
import { Card } from "@/components/Card";
import { cn } from "@/utils/cn";

import type { AnimatedMetricProps } from "./AnimatedMetric.types";

/**
 * A full stat card for the free-text metric values case studies and
 * projects actually store (`data/case-study.schema.ts`'s `metrics[].value`
 * — e.g. "+17%", "99.97%", but also "Zero unplanned" or "2 days -> 12
 * min"). CLAUDE.md Part 11's brief asks for metrics that "animate when
 * entering the viewport" — `AnimatedMetricValue` (shared with
 * `ProjectCard`'s compact layout) counts up for values `parseMetricValue`
 * can cleanly extract a number from, and falls back to the literal string
 * otherwise, so this never fabricates a count for prose that isn't
 * actually a number.
 *
 * No opacity-based entrance animation on the card itself (an earlier
 * version wrapped this in `Reveal`) — a real, reproducible a11y
 * regression, not a hypothetical one: axe's Storybook scan caught the
 * label/value text mid-fade, at partial opacity blended toward the white
 * background, which measures as failing color-contrast even though the
 * settled state passes. The count-up itself (a text-content change, not
 * an opacity change) is what actually satisfies "animate when entering
 * the viewport" here, without that risk.
 */
export function AnimatedMetric({ value, label, className }: AnimatedMetricProps) {
  return (
    <Card className={cn("space-y-1 p-6", className)}>
      <AnimatedMetricValue
        value={value}
        className="text-foreground text-3xl font-semibold tabular-nums"
      />
      <p className="text-muted text-sm">{label}</p>
    </Card>
  );
}
