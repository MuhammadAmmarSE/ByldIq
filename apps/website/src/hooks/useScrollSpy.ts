"use client";

import { useEffect, useState } from "react";

export interface UseScrollSpyOptions {
  rootMargin?: string;
}

/**
 * Tracks which of the given section ids is currently most visible, for
 * sticky in-page navigation (CLAUDE.md Part 8's "scrollspy navigation").
 * Unlike `useIntersectionObserver` (one ref, one boolean), this watches
 * several existing DOM elements by id at once and reports a single active
 * id — the shape a table-of-contents sidebar actually needs.
 */
export function useScrollSpy(ids: string[], { rootMargin }: UseScrollSpyOptions = {}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    const elements = key
      .split("|")
      .filter(Boolean)
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const topmost = visible.reduce((closest, entry) =>
          entry.boundingClientRect.top < closest.boundingClientRect.top ? entry : closest,
        );
        setActiveId(topmost.target.id);
      },
      { rootMargin: rootMargin ?? "-15% 0px -70% 0px", threshold: 0 },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, [key, rootMargin]);

  return activeId;
}
