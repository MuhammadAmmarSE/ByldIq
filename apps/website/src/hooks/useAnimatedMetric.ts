"use client";

import { useRef } from "react";
import type { RefObject } from "react";

import { parseMetricValue } from "@/utils/metric-value";

import { useCountUp } from "./useCountUp";

export interface UseAnimatedMetricResult {
  /** Attach to the element that should trigger the count-up when it scrolls into view. */
  ref: RefObject<HTMLElement | null>;
  /** The mid-animation (or, under reduced motion, final) formatted value. */
  display: string;
  /** The real final value, for an `sr-only` announcement independent of animation state. */
  finalText: string;
}

/**
 * Shared count-up formatting for a free-text metric value (`"+17%"`,
 * `"99.97%"`, `"1,200+"`) — the one place `parseMetricValue` +
 * `useCountUp` + sign/decimal formatting is implemented, reused by both
 * `AnimatedMetricValue` (compact, e.g. `ProjectCard`) and `AnimatedMetric`
 * (full stat card, e.g. `CaseStudyResults`) so the two don't duplicate the
 * same formatting logic for two different layouts. Returns `null` when
 * `value` isn't a countable number — callers render the literal string
 * instead of fabricating a count (see `parseMetricValue`'s doc comment).
 *
 * Always calls its hooks (Rules of Hooks) even when the value turns out
 * to be unparseable; the target is simply `0` and unused in that case.
 */
export function useAnimatedMetric(value: string): UseAnimatedMetricResult | null {
  const parsed = parseMetricValue(value);
  const ref = useRef<HTMLElement>(null);
  const target = parsed ? (parsed.sign === "-" ? -parsed.magnitude : parsed.magnitude) : 0;
  const animated = useCountUp(ref, target);

  if (!parsed) return null;

  const format = (n: number) =>
    parsed.decimals > 0 ? n.toFixed(parsed.decimals) : Math.round(n).toLocaleString();
  const signPrefix = parsed.sign === "+" ? "+" : "";

  return {
    ref,
    display: `${signPrefix}${format(animated)}${parsed.suffix}`,
    finalText: `${signPrefix}${format(target)}${parsed.suffix}`,
  };
}
