import { z } from "zod";

/**
 * Validates every entry in `technologies.ts` — the same "local typed
 * data now, content-collections later" approach as Solutions and Case
 * Studies, scaled to CLAUDE.md Part 22's technology-decision structure.
 * Unlike Solutions/Case Studies (which describe Byld IQ's own fictional
 * work), this platform's job is general engineering education — a
 * technology's content here isn't scoped to "have we used this," it's
 * scoped to "is this honest, accurate engineering knowledge." Related
 * Solutions/Case Studies/Article slugs are still cross-referenced against
 * real data in `technologies.test.ts`, but are allowed to be empty where
 * no genuine connection exists, rather than fabricating one.
 */

const strengthSchema = z.object({
  label: z.string().min(1),
  description: z.string().min(1),
});

const weaknessSchema = z.object({
  label: z.string().min(1),
  description: z.string().min(1),
});

const tradeOffSchema = z.object({
  bestFor: z.array(z.string().min(1)).min(1),
  avoidWhen: z.array(z.string().min(1)).min(1),
  alternatives: z.array(z.string().min(1)).min(1),
  /** Short, scannable — a quick comparison value, not the full cost breakdown (see `costAnalysis`). */
  cost: z.string().min(1),
  complexity: z.string().min(1),
  teamSize: z.string().min(1),
  /** Short, scannable — see `scalability` for the deeper narrative. */
  scalability: z.string().min(1),
});

const architectureNodeSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  description: z.string().min(1),
});

const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const technologySchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  /** A `TECHNOLOGY_CATEGORIES` slug — cross-referenced in `technologies.test.ts`, not a zod enum, matching the `businessProblem`/`BUSINESS_PROBLEMS` pattern in Case Studies. */
  category: z.string().min(1),
  tagline: z.string().min(1),
  maturity: z.string().min(1),
  learningCurve: z.string().min(1),
  typicalProjects: z.array(z.string().min(1)).min(1),
  businessFit: z.string().min(1),
  engineeringFit: z.string().min(1),

  // Business Value
  businessProblem: z.string().min(1),
  whyOrganizationsAdopt: z.string().min(1),
  whoBenefits: z.string().min(1),

  // Strengths / Weaknesses
  strengths: z.array(strengthSchema).min(3),
  weaknesses: z.array(weaknessSchema).min(3),

  // Trade-Off Explorer
  tradeOff: tradeOffSchema,

  // Interactive Architecture
  architecture: z.array(architectureNodeSchema).min(3),

  // Deeper narrative sections
  performance: z.string().min(1),
  security: z.string().min(1),
  accessibility: z.string().min(1),
  scalability: z.string().min(1),
  costAnalysis: z.string().min(1),

  // Related content — genuinely empty where no real connection exists.
  relatedSolutionSlugs: z.array(z.string().min(1)),
  relatedCaseStudySlugs: z.array(z.string().min(1)),
  relatedArticleSlugs: z.array(z.string().min(1)),

  faqs: z.array(faqSchema).min(2),
});

export type Technology = z.infer<typeof technologySchema>;
export type TechnologyStrength = z.infer<typeof strengthSchema>;
export type TechnologyWeakness = z.infer<typeof weaknessSchema>;
export type TechnologyTradeOff = z.infer<typeof tradeOffSchema>;
export type TechnologyArchitectureNode = z.infer<typeof architectureNodeSchema>;
export type TechnologyFaq = z.infer<typeof faqSchema>;
