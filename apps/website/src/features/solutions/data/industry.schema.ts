import { z } from "zod";

/**
 * Validates every entry in `industries.ts` — same "local typed data,
 * schema-checked" approach as `solution.schema.ts`. `exampleCaseStudySlugs`
 * is deliberately allowed to be empty (no `.min(1)`) — several industries
 * (FinTech, Real Estate, Education, Manufacturing, Healthcare, E-commerce)
 * have no real case study yet, and CLAUDE.md Part 13 rules out inventing
 * one just to avoid an empty list. `industries.test.ts` cross-references
 * every slug that IS present against real `CASE_STUDIES`/`SOLUTIONS`.
 */
export const industrySchema = z.object({
  slug: z.string().min(1),
  label: z.string().min(1),
  description: z.string().min(1),
  challenges: z.array(z.string().min(1)).min(1),
  recommendedSolutionSlugs: z.array(z.string().min(1)).min(1),
  exampleCaseStudySlugs: z.array(z.string().min(1)),
});

export type Industry = z.infer<typeof industrySchema>;
