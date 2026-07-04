"use client";

import { useRef } from "react";
import { motion } from "motion/react";

import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { useCountUp } from "@/hooks/useCountUp";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/utils/cn";

import type { HeroProductPreviewProps } from "./HeroProductPreview.types";

/** Illustrative bar heights (percent) — purely decorative texture, not real data. */
const BAR_HEIGHTS = [40, 65, 50, 80, 60, 95];

/**
 * The Adaptive Hero's "interactive product preview" (CLAUDE.md Part 11):
 * a small mock dashboard panel — animated metric counter, a bar chart, and
 * the journey's representative stack. Deliberately lighter than the full
 * Interactive Product Showcase (Part 14, Phase 6) — this is a glanceable
 * hero visual, not a duplicate of the dedicated showcase pods.
 */
export function HeroProductPreview({ content, className }: HeroProductPreviewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const value = useCountUp(ref, content.metric.value, { duration: 1.4 });

  const isWholeNumber = Number.isInteger(content.metric.value);
  const displayValue = isWholeNumber ? Math.round(value).toLocaleString() : value.toFixed(1);

  return (
    <div ref={ref} className={cn(className)}>
      <Card className="overflow-hidden">
        <Card.Header>
          <p className="text-muted text-sm">{content.metric.label}</p>
          <p className="text-foreground text-3xl font-semibold tabular-nums" aria-hidden="true">
            {displayValue}
            {content.metric.suffix}
          </p>
          <span className="sr-only">
            {content.metric.label}: {content.metric.value.toLocaleString()}
            {content.metric.suffix}
          </span>
        </Card.Header>
        <Card.Content>
          <div className="flex h-24 items-end gap-2" aria-hidden="true">
            {BAR_HEIGHTS.map((height, index) => (
              <motion.div
                key={index}
                className="bg-accent/70 flex-1 rounded-t-sm"
                initial={reducedMotion ? { height: `${height}%` } : { height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{
                  duration: reducedMotion ? 0 : 0.6,
                  delay: reducedMotion ? 0 : index * 0.08,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {content.technologies.map((technology) => (
              <Badge key={technology} variant="outline">
                {technology}
              </Badge>
            ))}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
