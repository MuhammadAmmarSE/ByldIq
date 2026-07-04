import { env } from "@/lib/env";
import type { NavItem } from "@/types/navigation";

export const siteConfig = {
  name: "Byld IQ",
  url: env.NEXT_PUBLIC_SITE_URL,
  locale: "en-US",
  defaultTheme: "system",
} as const;

/**
 * Populated by Milestone 2 (navigation component) / the sitemap milestones —
 * left empty here since nav content is product IA, not architecture.
 */
export const primaryNav: NavItem[] = [];

/**
 * Extend as real feature flags are needed. Kept empty now rather than
 * pre-declaring flags for features that don't exist yet.
 */
export interface FeatureFlags {
  [flag: string]: boolean;
}

export const featureFlags: FeatureFlags = {};
