"use client";

import { useScrollDepth } from "./useScrollDepth";

/**
 * Mounts `useScrollDepth` once at a page's root. Exists because most
 * pages that use it are Server Components; this is the client boundary
 * that lets them call a client-only hook. `page` identifies which page
 * fired the resulting `scroll_depth_reached` events.
 */
export function ScrollDepthTracker({ page }: { page?: string } = {}): null {
  useScrollDepth(page);
  return null;
}
