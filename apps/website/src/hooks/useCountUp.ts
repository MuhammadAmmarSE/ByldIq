"use client";

import { useEffect, useState } from "react";
import { useInView } from "motion/react";
import type { RefObject } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface UseCountUpOptions {
  /** Seconds. Defaults to 1.2 — long enough to read as counting, short enough not to stall the section. */
  duration?: number;
  once?: boolean;
}

/**
 * Animated number counter for metrics (Proof Engine, Product Thinking,
 * Engineering Excellence dashboards — CLAUDE.md Part 6: "Metrics. Animated
 * counting."). Counts only once the target scrolls into view, and jumps
 * straight to the final value under `prefers-reduced-motion`.
 */
export function useCountUp(
  ref: RefObject<Element | null>,
  target: number,
  { duration = 1.2, once = true }: UseCountUpOptions = {},
): number {
  const isInView = useInView(ref, { once });
  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (reducedMotion) {
      setValue(target);
      return;
    }

    let frame: number;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = (now - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.round(target * progress));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target, duration, reducedMotion]);

  return value;
}
