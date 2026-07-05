"use client";

import { useEffect, useRef } from "react";

import { useAnalytics } from "@/providers/AnalyticsProvider";

import "./analytics";

const THRESHOLDS = [25, 50, 75, 100] as const;

/**
 * Fires `scroll_depth_reached` once per threshold as the visitor scrolls
 * down the page (CLAUDE.md Part 4: "Evaluate experience using scroll
 * depth"). Mount once at a page's root (see `ScrollDepthTracker`), not
 * per-section — it measures depth through the whole document. `page`
 * identifies which page fired the event, since this hook is shared across
 * the whole site, not just the homepage its folder name suggests.
 */
export function useScrollDepth(page?: string): void {
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
          analytics.track("scroll_depth_reached", { depth: threshold, page });
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [analytics, page]);
}
