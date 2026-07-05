import type { JourneyContentMap } from "@/features/homepage/shared";

export interface SolutionsHeroContent {
  headline: string;
  supportingCopy: string;
}

/**
 * Journey-aware copy for the Solutions landing page hero (CLAUDE.md Part
 * 20: "adaptive hero, journey-aware messaging"). Distinct wording from the
 * homepage's own Adaptive Hero (`features/homepage/adaptive-hero`) even
 * where the underlying theme overlaps, since a visitor could plausibly see
 * both on the same visit.
 */
export const SOLUTIONS_HERO_CONTENT: JourneyContentMap<SolutionsHeroContent> = {
  default: {
    headline: "Solutions engineered around your problem, not our services.",
    supportingCopy:
      "Every solution starts with the business outcome you need, not the technology we'd like to use. Choose the one that matches where you are.",
  },
  startup: {
    headline: "Startup solutions, prioritized for you.",
    supportingCopy:
      "You told us you're building a startup product — we've highlighted the solution built around validation, speed, and fundraising-ready architecture.",
  },
  enterprise: {
    headline: "Enterprise solutions, prioritized for you.",
    supportingCopy:
      "You told us you're modernizing an enterprise system — we've highlighted the solution built around incremental migration and zero downtime.",
  },
  commerce: {
    headline: "Commerce solutions, prioritized for you.",
    supportingCopy:
      "You told us you're growing a commerce business — we've highlighted the solution built around conversion, performance, and reliability at peak traffic.",
  },
  ai: {
    headline: "AI solutions, prioritized for you.",
    supportingCopy:
      "You told us you're exploring AI — we've highlighted the solution built around measurable business value, not novelty.",
  },
  platform: {
    headline: "Platform solutions, prioritized for you.",
    supportingCopy:
      "You told us you're building developer platforms and infrastructure — we've highlighted the solution built around scale and developer experience.",
  },
};
