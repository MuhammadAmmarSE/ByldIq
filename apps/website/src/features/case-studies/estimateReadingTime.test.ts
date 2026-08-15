import { describe, expect, it } from "vitest";

import { CASE_STUDIES } from "./data/case-studies";
import { estimateReadingTime } from "./estimateReadingTime";

describe("estimateReadingTime", () => {
  it("returns a positive whole number of minutes for every real case study", () => {
    for (const caseStudy of CASE_STUDIES) {
      const minutes = estimateReadingTime(caseStudy);
      expect(Number.isInteger(minutes)).toBe(true);
      expect(minutes).toBeGreaterThanOrEqual(1);
    }
  });

  it("estimates a longer read for a case study with substantially more content", () => {
    const [shortStudy] = CASE_STUDIES;
    if (!shortStudy) throw new Error("Fixture requires at least one case study");

    const paddedStudy = {
      ...shortStudy,
      whatWorked: [...shortStudy.whatWorked, "word ".repeat(2000).trim()],
    };

    expect(estimateReadingTime(paddedStudy)).toBeGreaterThan(estimateReadingTime(shortStudy));
  });
});
