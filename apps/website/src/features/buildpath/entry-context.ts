import type { Journey } from "@/types/journey";

import type { ProjectType } from "./types";

/**
 * Heuristic mappings used to prefill `ProjectType[]` when a visitor lands
 * on `/buildpath` from a Solution or Technology page. These are judgment
 * calls, same spirit as `solutions.ts`'s journey mapping — good enough to
 * feel relevant, not a guarantee of the visitor's actual intent (they can
 * always change their selection on the Idea stage).
 */
const JOURNEY_TO_PROJECT_TYPES: Record<Journey, ProjectType[]> = {
  startup: ["MVP", "New Product"],
  enterprise: ["Enterprise Platform"],
  commerce: ["E-commerce"],
  ai: ["AI Product"],
  platform: ["SaaS"],
};

export function journeyToProjectTypes(journey: Journey): ProjectType[] {
  return JOURNEY_TO_PROJECT_TYPES[journey] ?? [];
}

const TECHNOLOGY_CATEGORY_TO_PROJECT_TYPES: Partial<Record<string, ProjectType[]>> = {
  ai: ["AI Product"],
  commerce: ["E-commerce"],
  mobile: ["Mobile App"],
};

export function technologyCategoryToProjectTypes(category: string): ProjectType[] {
  return TECHNOLOGY_CATEGORY_TO_PROJECT_TYPES[category] ?? [];
}
