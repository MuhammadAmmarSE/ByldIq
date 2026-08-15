import { z } from "zod";

import { JOURNEYS } from "@/types/journey";

/**
 * Validates every entry in `solutions.ts` — same "local typed data now,
 * content-collections later" approach as the Proof Engine's case studies
 * (`case-study.schema.ts`), scaled up for the much larger Solutions
 * content model (CLAUDE.md Part 20).
 */

const capabilitySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  why: z.string().min(1),
  when: z.string().min(1),
  benefits: z.array(z.string().min(1)).min(1),
  risks: z.array(z.string().min(1)).min(1),
  timeline: z.string().min(1),
  relatedTechnologies: z.array(z.string().min(1)).min(1),
});

const architectureNodeSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  description: z.string().min(1),
});

const technologySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  why: z.string().min(1),
  when: z.string().min(1),
  alternatives: z.array(z.string().min(1)).min(1),
  tradeoffs: z.string().min(1),
  cost: z.string().min(1),
  scalability: z.string().min(1),
  teamRequirements: z.string().min(1),
});

const successMetricSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const solutionSchema = z.object({
  slug: z.string().min(1),
  /**
   * The closest of the five homepage journeys — drives AI Companion
   * context and BuildPath prefill. Only 5 of the 9 solutions map 1:1
   * onto a journey; the rest use the closest fit (see `solutions.ts`).
   */
  journey: z.enum(JOURNEYS),
  navLabel: z.string().min(1),
  title: z.string().min(1),
  heroHeadline: z.string().min(1),
  heroSupportingCopy: z.string().min(1),
  primaryCtaLabel: z.string().min(1),
  who: z.string().min(1),
  /** Landing page selector card field (CLAUDE.md Part 20): example company profiles this solution fits, not literal case-study company names. */
  typicalCompanies: z.array(z.string().min(1)).min(1),
  /** Landing page selector card field: example product types this solution produces. */
  exampleProducts: z.array(z.string().min(1)).min(1),
  businessProblem: z.string().min(1),
  businessOutcomes: z.array(z.string().min(1)).min(1),
  engineeringPhilosophy: z.string().min(1),
  capabilities: z.array(capabilitySchema).min(1),
  architecture: z.array(architectureNodeSchema).min(1),
  technologies: z.array(technologySchema).min(1),
  successMetrics: z.array(successMetricSchema).min(1),
  /** Milestone 10's "Timeline" — an overall engagement duration, distinct from `DELIVERY_STAGES` (the shared nine-stage *process*, not a duration) and from each capability's own narrower `timeline`. */
  deliveryTimeline: z.string().min(1),
  /** Milestone 10's "Team composition" — role labels (optionally with a count prefix, e.g. "2 Backend Engineers"), reusing CLAUDE.md Part 17's Suggested Team roles rather than inventing new titles. */
  teamComposition: z.array(z.string().min(1)).min(1),
  /**
   * Milestone 10's "Estimated investment." Deliberately qualitative, never
   * a dollar figure — CLAUDE.md Part 7 rules out inventing numbers, and
   * the AI Companion's own `RESPONSES.pricing` already states the
   * company's real position: "We don't quote a price without
   * understanding the product first... BuildPath will give you a
   * realistic investment range." A per-solution dollar figure here would
   * contradict that stated philosophy, not just be unverifiable.
   */
  investmentGuidance: z.string().min(1),
  relatedCaseStudySlugs: z.array(z.string().min(1)).min(1),
  relatedArticleSlugs: z.array(z.string().min(1)).min(1),
  faqs: z.array(faqSchema).min(1),
});

export type Solution = z.infer<typeof solutionSchema>;
export type SolutionCapability = z.infer<typeof capabilitySchema>;
export type ArchitectureNode = z.infer<typeof architectureNodeSchema>;
export type SolutionTechnology = z.infer<typeof technologySchema>;
export type SuccessMetric = z.infer<typeof successMetricSchema>;
export type SolutionFaq = z.infer<typeof faqSchema>;
