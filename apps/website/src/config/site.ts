import { env } from "@/lib/env";
import type { NavItem } from "@/types/navigation";

export const siteConfig = {
  name: "Byld IQ",
  url: env.NEXT_PUBLIC_SITE_URL,
  locale: "en-US",
  defaultTheme: "system",
} as const;

/**
 * Static top-level nav entries with no dropdown — only routes that exist
 * today (CLAUDE.md Part 8: "No page should ever become a dead end").
 * CLAUDE.md Part 8's full nav also names Process, About, and Contact, but
 * those pages don't exist yet — adding them now would just be dead links.
 * The Solutions, Work, Technology, and Knowledge entries (all dropdowns)
 * are assembled separately in `app/layout.tsx`, which can reach their
 * respective feature data — this file stays feature-free per CLAUDE.md
 * Part 27's dependency direction (Shared components like `PageShell`,
 * which reads this config, must not depend on Features).
 */
export const primaryNav: NavItem[] = [{ label: "BuildPath", href: "/buildpath" }];

/**
 * Extend as real feature flags are needed. Kept empty now rather than
 * pre-declaring flags for features that don't exist yet.
 */
export interface FeatureFlags {
  [flag: string]: boolean;
}

export const featureFlags: FeatureFlags = {};
