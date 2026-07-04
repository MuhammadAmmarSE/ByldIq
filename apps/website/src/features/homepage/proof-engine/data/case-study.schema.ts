import { z } from "zod";

/**
 * Validates the shape of every entry in `case-studies.ts` — catches
 * data-authoring typos (a missing metric, an empty string) the way a real
 * CMS schema would, per the plan's "local typed data now, content-collections
 * later" approach.
 */
export const caseStudySchema = z.object({
  slug: z.string().min(1),
  companyId: z.string().min(1),
  headline: z.string().min(1),
  challenge: z.string().min(1),
  approach: z.string().min(1),
  outcome: z.string().min(1),
  metrics: z
    .array(
      z.object({
        label: z.string().min(1),
        value: z.string().min(1),
      }),
    )
    .min(1),
  technologies: z.array(z.string().min(1)).min(1),
  featured: z.boolean().optional(),
});

export type CaseStudy = z.infer<typeof caseStudySchema>;
