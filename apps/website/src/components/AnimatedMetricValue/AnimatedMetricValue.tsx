"use client";

import type { RefObject } from "react";

import { useAnimatedMetric } from "@/hooks/useAnimatedMetric";

import type { AnimatedMetricValueProps } from "./AnimatedMetricValue.types";

/**
 * The bare, unwrapped counting text for a metric value — no label, no
 * card. Exists alongside `AnimatedMetric` (a full stat card) so a compact
 * layout like `ProjectCard`'s inline metric grid gets the same count-up
 * behavior without inheriting a card wrapper it doesn't want. Both
 * components share the actual formatting logic via `useAnimatedMetric`
 * rather than duplicating it.
 */
export function AnimatedMetricValue({ value, className }: AnimatedMetricValueProps) {
  const animated = useAnimatedMetric(value);

  if (!animated) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={animated.ref as RefObject<HTMLSpanElement>} className={className}>
      <span aria-hidden="true">{animated.display}</span>
      <span className="sr-only">{animated.finalText}</span>
    </span>
  );
}
