"use client";

import { useScrollDepth } from "./useScrollDepth";

/**
 * Mounts `useScrollDepth` once at the homepage root. Exists only because
 * the root page is a Server Component (it reads the intro-seen cookie);
 * this is the client boundary that lets it call a client-only hook.
 */
export function ScrollDepthTracker(): null {
  useScrollDepth();
  return null;
}
