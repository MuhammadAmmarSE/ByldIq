"use client";

import { useEffect, type RefObject } from "react";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useAnalytics } from "@/providers/AnalyticsProvider";

import "./analytics";

/**
 * Fires `section_viewed` exactly once, the first time the returned ref's
 * element scrolls into the viewport. Attach the ref to each homepage
 * section's root element (see `HomepageSection`).
 */
export function useSectionAnalytics<T extends Element>(section: string): RefObject<T | null> {
  const analytics = useAnalytics();
  const [ref, isVisible] = useIntersectionObserver<T>({ threshold: 0.4, once: true });

  useEffect(() => {
    if (isVisible) {
      analytics.track("section_viewed", { section });
    }
  }, [isVisible, section, analytics]);

  return ref;
}
