import { z } from "zod";

/**
 * Validates every entry in `case-studies.ts` — the "local typed data now,
 * content-collections later" approach, scaled up for Milestone 5's much
 * richer case study model (CLAUDE.md Part 21's fourteen-section
 * structure). Every array below maps to a section the actual page
 * renders — nothing here is speculative content with no corresponding UI.
 */

const discoveryActivitySchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

const productDecisionSchema = z.object({
  decision: z.string().min(1),
  reasoning: z.string().min(1),
  tradeoff: z.string().min(1),
});

const architectureNodeSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  description: z.string().min(1),
});

const technologyDecisionSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  why: z.string().min(1),
  alternatives: z.array(z.string().min(1)).min(1),
  tradeoffs: z.string().min(1),
  businessImpact: z.string().min(1),
  maintenanceConsiderations: z.string().min(1),
});

const engineeringStageSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  description: z.string().min(1),
});

const challengeSchema = z.object({
  issue: z.string().min(1),
  resolution: z.string().min(1),
});

const metricSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const caseStudySchema = z.object({
  slug: z.string().min(1),
  companyId: z.string().min(1),
  featured: z.boolean().optional(),

  // 1. Executive summary
  headline: z.string().min(1),
  executiveSummary: z.string().min(1),
  /** Filter facet for `/work/business-problem/[problem]` — a stable slug, not display copy. */
  businessProblem: z.string().min(1),
  projectScale: z.string().min(1),
  teamSize: z.string().min(1),
  timeline: z.string().min(1),
  platform: z.array(z.string().min(1)).min(1),
  projectType: z.string().min(1),
  aiInvolvement: z.boolean(),

  // 2. Business challenge
  challenge: z.string().min(1),
  whyItMattered: z.string().min(1),
  constraints: z.array(z.string().min(1)).min(1),
  risks: z.array(z.string().min(1)).min(1),
  successCriteria: z.array(z.string().min(1)).min(1),

  // 3. Discovery
  discovery: z.array(discoveryActivitySchema).min(1),

  // 4. Product thinking
  productDecisions: z.array(productDecisionSchema).min(1),
  rejectedIdeas: z.array(z.string().min(1)).min(1),

  // 5. Architecture
  architecture: z.array(architectureNodeSchema).min(1),

  // 6. Technology decisions
  technologyDecisions: z.array(technologyDecisionSchema).min(1),
  /** Badge-list summary shown on cards — the same technologies as `technologyDecisions`, by name. */
  technologies: z.array(z.string().min(1)).min(1),

  // 7. Engineering process
  engineeringProcess: z.array(engineeringStageSchema).min(1),

  // 8. Challenges
  challenges: z.array(challengeSchema).min(1),

  // 9. Results
  approach: z.string().min(1),
  outcome: z.string().min(1),
  metrics: z.array(metricSchema).min(1),

  // 10. Lessons learned
  whatWorked: z.array(z.string().min(1)).min(1),
  whatCouldImprove: z.array(z.string().min(1)).min(1),
  recommendations: z.array(z.string().min(1)).min(1),

  // 11. Related content
  relatedSolutionSlugs: z.array(z.string().min(1)).min(1),
  relatedArticleSlugs: z.array(z.string().min(1)).min(1),

  faqs: z.array(faqSchema).min(1),
});

export type CaseStudy = z.infer<typeof caseStudySchema>;
export type DiscoveryActivity = z.infer<typeof discoveryActivitySchema>;
export type ProductDecision = z.infer<typeof productDecisionSchema>;
export type ArchitectureNode = z.infer<typeof architectureNodeSchema>;
export type TechnologyDecision = z.infer<typeof technologyDecisionSchema>;
export type EngineeringStage = z.infer<typeof engineeringStageSchema>;
export type Challenge = z.infer<typeof challengeSchema>;
export type CaseStudyFaq = z.infer<typeof faqSchema>;
