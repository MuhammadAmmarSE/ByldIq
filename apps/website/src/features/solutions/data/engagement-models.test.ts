import { describe, expect, it } from "vitest";

import { engagementModelSchema } from "./engagement-model.schema";
import { ENGAGEMENT_MODELS } from "./engagement-models";
import { SOLUTIONS } from "./solutions";

describe("ENGAGEMENT_MODELS", () => {
  it("validates against the schema", () => {
    for (const model of ENGAGEMENT_MODELS) {
      expect(() => engagementModelSchema.parse(model)).not.toThrow();
    }
  });

  it("has unique slugs", () => {
    const slugs = ENGAGEMENT_MODELS.map((model) => model.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has exactly the five models Milestone 10 requires", () => {
    const slugs = ENGAGEMENT_MODELS.map((model) => model.slug).sort();
    expect(slugs).toEqual(
      [
        "fixed-scope",
        "agile-team",
        "dedicated-team",
        "staff-augmentation",
        "product-partnership",
      ].sort(),
    );
  });

  it("references only real solutions where a relatedSolutionSlug is set", () => {
    const realSlugs = new Set(SOLUTIONS.map((solution) => solution.slug));
    for (const model of ENGAGEMENT_MODELS) {
      if (model.relatedSolutionSlug) {
        expect(realSlugs.has(model.relatedSolutionSlug)).toBe(true);
      }
    }
  });
});
