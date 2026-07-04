"use client";

import { useEffect, useRef } from "react";

import { useAnalytics } from "@/providers/AnalyticsProvider";

import "./analytics";

const THRESHOLDS = [25, 50, 75, 100] as const;

/**
 * Fires `scroll_depth_reached` once per threshold as the visitor scrolls
 * down the page (CLAUDE.md Part 4: "Evaluate experience using scroll
 * depth"). Mount once at the homepage root (see Phase 12 composition), not
 * per-section — it measures depth through the whole document.
 */
export function useScrollDepth(): void {
  const analytics = useAnalytics();
  const firedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    function handleScroll() {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const percentScrolled = (window.scrollY / scrollableHeight) * 100;

      for (const threshold of THRESHOLDS) {
        if (percentScrolled >= threshold && !firedRef.current.has(threshold)) {
          firedRef.current.add(threshold);
          analytics.track("scroll_depth_reached", { depth: threshold });
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [analytics]);
}
