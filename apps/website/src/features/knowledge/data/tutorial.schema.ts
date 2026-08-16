import { z } from "zod";

import type { CodeLanguage } from "@/components/CodeBlock";

import { KNOWLEDGE_DIFFICULTIES } from "./knowledge-article.schema";

/**
 * CLAUDE.md Part 18/19's Tutorials (Milestone 15): "Prerequisites → Setup
 * → Step 1 → Step 2 → Step 3 → Validation → Next Steps" — a distinct,
 * hands-on content model from the educational article template, the same
 * way `playbookSchema` is distinct from it. A separate `data/tutorials.ts`
 * (not folded into `articles.ts`) since a tutorial genuinely isn't an
 * article with a different `type` — it has no executive summary, core
 * concepts, or common mistakes; it's a sequence of steps to actually run.
 */

const CODE_LANGUAGES = [
  "bash",
  "typescript",
  "tsx",
  "json",
  "text",
] as const satisfies readonly CodeLanguage[];

const codeSampleSchema = z.object({
  code: z.string().min(1),
  language: z.enum(CODE_LANGUAGES),
  filename: z.string().min(1).optional(),
});

const tutorialStepSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  instructions: z.string().min(1),
  code: codeSampleSchema.optional(),
});

export const tutorialSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  /** A `KNOWLEDGE_CATEGORIES` slug, the same pattern `knowledge-article.schema.ts` uses. */
  category: z.string().min(1),
  difficulty: z.enum(KNOWLEDGE_DIFFICULTIES),
  duration: z.string().min(1),
  summary: z.string().min(1),

  prerequisites: z.array(z.string().min(1)).min(1),
  setup: z.object({
    instructions: z.string().min(1),
    code: codeSampleSchema.optional(),
  }),
  steps: z.array(tutorialStepSchema).min(3),
  validation: z.string().min(1),
  nextSteps: z.array(z.string().min(1)).min(1),

  relatedTechnologySlugs: z.array(z.string().min(1)),
  relatedArticleSlugs: z.array(z.string().min(1)),
});

export type Tutorial = z.infer<typeof tutorialSchema>;
export type TutorialStep = z.infer<typeof tutorialStepSchema>;
export type TutorialCodeSample = z.infer<typeof codeSampleSchema>;
