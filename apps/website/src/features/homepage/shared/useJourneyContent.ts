"use client";

import { useAppStore } from "@/providers/StoreProvider";
import type { Journey } from "@/types/journey";

export type JourneyContentMap<T> = Record<Journey, T> & { default: T };

/**
 * The single lookup pattern every journey-adaptive homepage module uses:
 * pass a map of per-journey content plus a `default` entry, get back
 * whichever applies to the visitor's current selection. Centralizing this
 * (rather than each module reading `useAppStore` and branching itself) is
 * what makes "Visitor skips selection -> Generic homepage" (Part 10) and
 * "changing journey updates content instantly" both fall out for free —
 * every module re-renders from the same store subscription.
 */
export function useJourneyContent<T>(contentMap: JourneyContentMap<T>): T {
  const journey = useAppStore((state) => state.journey);
  return journey ? contentMap[journey] : contentMap.default;
}
