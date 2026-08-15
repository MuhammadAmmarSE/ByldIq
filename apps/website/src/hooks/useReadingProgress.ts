"use client";

import { useEffect, useState } from "react";

/**
 * CLAUDE.md Part 18/23's Reading Experience: reading progress. Tracks how
 * far down the document a visitor has scrolled as a 0-100 percentage —
 * the same `scrollY / scrollableHeight` calculation `useScrollDepth` uses
 * for analytics thresholds, returned here as a continuous value for a
 * visual progress bar instead of discrete tracked events.
 *
 * Promoted from `features/knowledge` to this shared location in
 * Milestone 12, once the Case Studies platform became a second real
 * consumer (CLAUDE.md Part 27: "promote only after multiple real use
 * cases") — see `ReadingProgressBar`.
 */
export function useReadingProgress(): number {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) {
        setPercent(100);
        return;
      }
      const nextPercent = (window.scrollY / scrollableHeight) * 100;
      setPercent(Math.min(100, Math.max(0, Math.round(nextPercent))));
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return percent;
}
