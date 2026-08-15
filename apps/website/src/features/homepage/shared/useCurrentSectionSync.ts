"use client";

import { useEffect, type RefObject } from "react";

import { useAiCompanionStore } from "@/providers/AiCompanionStoreProvider";

/**
 * Keeps the AI Companion store's `currentSection` in sync with whichever
 * homepage section is actually in view, so Byld can reference "what
 * you're looking at right now" even when no `pageContext` has been set
 * (CLAUDE.md Part 16: "Byld always understands: Current page"). Takes an
 * existing ref (from `useSectionAnalytics`) rather than creating its own —
 * a second `IntersectionObserver` on the same DOM node, not a second ref
 * fighting the first one for the same element.
 *
 * Deliberately continuous (`once: false`) and never clears back to
 * `null` on scroll-out: the next section's own intersection overwrites
 * it, so there's always a "last known" section instead of flickering to
 * null mid-scroll between two sections.
 */
export function useCurrentSectionSync<T extends Element>(
  section: string,
  ref: RefObject<T | null>,
) {
  const setCurrentSection = useAiCompanionStore((state) => state.setCurrentSection);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setCurrentSection(section);
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, section, setCurrentSection]);
}
