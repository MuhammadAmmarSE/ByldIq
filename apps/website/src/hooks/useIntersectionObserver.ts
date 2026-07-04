"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  /** Stop observing after the first time the element intersects. Defaults to `true` — most callers (section analytics, reveal-once effects) only care about the first entrance. */
  once?: boolean;
}

/**
 * Thin wrapper around `IntersectionObserver` for section-visibility analytics
 * and entrance effects that need more control than the `Reveal` component's
 * `whileInView` (e.g. firing a one-time analytics event rather than an
 * animation). `vitest.setup.ts` stubs `IntersectionObserver` globally, so
 * this is safe to unit test.
 */
export function useIntersectionObserver<T extends Element>({
  once = true,
  root = null,
  rootMargin,
  threshold,
}: UseIntersectionObserverOptions = {}): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsIntersecting(false);
        }
      },
      { root, rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, root, rootMargin, threshold]);

  return [ref, isIntersecting];
}
