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

/**
 * Same heuristic-mapping approach, applied to a Knowledge article's or
 * tutorial's `KNOWLEDGE_CATEGORIES` slug — only mapped where a category
 * genuinely implies a project type; categories like "accessibility" or
 * "testing" are cross-cutting concerns that don't imply one, so they
 * deliberately resolve to an empty prefill rather than a guess.
 */
const KNOWLEDGE_CATEGORY_TO_PROJECT_TYPES: Partial<Record<string, ProjectType[]>> = {
  mvp: ["MVP", "New Product"],
  ai: ["AI Product"],
  shopify: ["E-commerce"],
  architecture: ["Modernization"],
  devops: ["Modernization"],
};

export function knowledgeCategoryToProjectTypes(category: string): ProjectType[] {
  return KNOWLEDGE_CATEGORY_TO_PROJECT_TYPES[category] ?? [];
}
