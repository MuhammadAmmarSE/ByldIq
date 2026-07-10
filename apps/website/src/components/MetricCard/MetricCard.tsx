"use client";

import { useRef } from "react";

import { Card } from "@/components/Card";
import { useCountUp } from "@/hooks/useCountUp";

import type { MetricCardProps } from "./MetricCard.types";

/**
 * An animated stat card (CLAUDE.md Part 6: "Metrics. Animated counting.")
 * — built on the existing `useCountUp` hook rather than a new counting
 * implementation. Follows the same accessibility pattern
 * `HeroProductPreview` already established: the animated digits are
 * `aria-hidden` (a screen reader shouldn't narrate every intermediate
 * frame), paired with one `sr-only` node announcing the final value once.
 */
export function MetricCard({
  value,
  label,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration,
  className,
}: MetricCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const animated = useCountUp(ref, value, duration ? { duration } : undefined);
  const displayValue =
    decimals > 0 ? animated.toFixed(decimals) : Math.round(animated).toLocaleString();

  return (
    <div ref={ref} className={className}>
      <Card className="space-y-1 p-6">
        <p className="text-foreground text-3xl font-semibold tabular-nums" aria-hidden="true">
          {prefix}
          {displayValue}
          {suffix}
        </p>
        <p className="text-muted text-sm">{label}</p>
        <span className="sr-only">
          {label}: {prefix}
          {value.toLocaleString()}
          {suffix}
        </span>
      </Card>
    </div>
  );
}
