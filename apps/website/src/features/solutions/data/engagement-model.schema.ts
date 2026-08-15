import { z } from "zod";

/** Validates every entry in `engagement-models.ts` — same "local typed data, schema-checked" approach as `solution.schema.ts` and `industry.schema.ts`. */
export const engagementModelSchema = z.object({
  slug: z.string().min(1),
  label: z.string().min(1),
  description: z.string().min(1),
  bestFor: z.array(z.string().min(1)).min(1),
  pros: z.array(z.string().min(1)).min(1),
  process: z.array(z.string().min(1)).min(1),
  teamStructure: z.array(z.string().min(1)).min(1),
  /** The `SOLUTIONS` slug most directly associated with this model, e.g. "Dedicated Team" → the "dedicated-teams" solution. Optional — most models apply across every solution, not just one. */
  relatedSolutionSlug: z.string().min(1).optional(),
});

export type EngagementModel = z.infer<typeof engagementModelSchema>;
