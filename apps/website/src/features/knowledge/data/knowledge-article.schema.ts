import { z } from "zod";

/**
 * Validates every entry in `articles.ts` — the same "local typed data now,
 * content-collections later" approach as Solutions, Case Studies, and
 * Technology, scaled to CLAUDE.md Part 18's eleven-section article
 * architecture. Deliberately omits fields the spec implies but this
 * platform can't honestly support yet:
 *
 * - No `datePublished`/`updatedDate` — there are no real authored dates
 *   for this content, and CLAUDE.md's "never fabricate numbers" applies
 *   equally to fabricated dates (the same reasoning `case-study.schema.ts`
 *   documents for its own dateless Article JSON-LD).
 * - No cover image — no real photography or illustration assets exist for
 *   this content (CLAUDE.md Part 5 rejects stock photography; Part 28
 *   governs brand assets we don't have for arbitrary article art).
 */

const learningOutcomesSchema = z.array(z.string().min(1)).min(2);

const coreConceptSchema = z.object({
  term: z.string().min(1),
  explanation: z.string().min(1),
});

const learningStepSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  description: z.string().min(1),
});

const realExampleSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

const commonMistakeSchema = z.object({
  mistake: z.string().min(1),
  consequence: z.string().min(1),
});

export const KNOWLEDGE_ARTICLE_TYPES = ["guide", "comparison", "playbook"] as const;
export const KNOWLEDGE_DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"] as const;

export const knowledgeArticleSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  /** A `KNOWLEDGE_CATEGORIES` slug — cross-referenced in `articles.test.ts`, matching the Technology Explorer's category pattern. */
  category: z.string().min(1),
  type: z.enum(KNOWLEDGE_ARTICLE_TYPES),
  difficulty: z.enum(KNOWLEDGE_DIFFICULTIES),
  readingTime: z.string().min(1),
  summary: z.string().min(1),
  /** A short AI-style summary shown when "Ask Byld" is expanded — pre-written, not live-generated (see ArticleCard.docs.md). */
  aiSummary: z.string().min(1),
  featured: z.boolean().optional(),

  // 1. Executive Summary
  problem: z.string().min(1),
  importance: z.string().min(1),
  audience: z.array(z.string().min(1)).min(1),
  learningOutcomes: learningOutcomesSchema,

  // 2. Why It Matters
  businessContext: z.string().min(1),
  engineeringContext: z.string().min(1),
  realWorldRelevance: z.string().min(1),

  // 3. Core Concepts
  coreConcepts: z.array(coreConceptSchema).min(2),

  // 4. Interactive Learning — a selectable walkthrough, the same
  // interaction pattern as Technology's ArchitectureNode (proven
  // accessible, not a fabricated diagram-rendering pipeline).
  walkthrough: z.array(learningStepSchema).min(3),

  // 5. Real Examples
  realExamples: z.array(realExampleSchema).min(2),

  // 6. Common Mistakes
  commonMistakes: z.array(commonMistakeSchema).min(2),

  // 7. Related Technologies / 8. Related Case Studies / 11. Related Learning —
  // genuinely empty where no real connection exists, never fabricated.
  // No `relatedSolutionSlugs`: CLAUDE.md Part 18's article template lists
  // Related Technologies and Related Case Studies, not Related Solutions —
  // Solutions already link out to Knowledge (`RelatedKnowledge`), and this
  // platform doesn't need the reverse link to avoid a dead end.
  relatedTechnologySlugs: z.array(z.string().min(1)),
  relatedCaseStudySlugs: z.array(z.string().min(1)),
  relatedArticleSlugs: z.array(z.string().min(1)),
});

export type KnowledgeArticle = z.infer<typeof knowledgeArticleSchema>;
export type KnowledgeArticleType = (typeof KNOWLEDGE_ARTICLE_TYPES)[number];
export type KnowledgeDifficulty = (typeof KNOWLEDGE_DIFFICULTIES)[number];
export type CoreConcept = z.infer<typeof coreConceptSchema>;
export type LearningStep = z.infer<typeof learningStepSchema>;
export type RealExample = z.infer<typeof realExampleSchema>;
export type CommonMistake = z.infer<typeof commonMistakeSchema>;
