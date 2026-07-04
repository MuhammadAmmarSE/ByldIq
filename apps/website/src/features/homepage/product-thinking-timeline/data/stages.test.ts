import { describe, expect, it } from "vitest";

import { TIMELINE_STAGES } from "./stages";

describe("TIMELINE_STAGES", () => {
  it("defines exactly the ten stages from CLAUDE.md Part 12, in order", () => {
    expect(TIMELINE_STAGES.map((stage) => stage.id)).toEqual([
      "idea",
      "discovery",
      "research",
      "strategy",
      "architecture",
      "experience-design",
      "engineering",
      "testing",
      "launch",
      "growth",
    ]);
  });

  it("gives every stage a title, headline, description, overview, mistake, approach, and deliverables", () => {
    for (const stage of TIMELINE_STAGES) {
      expect(stage.title.length).toBeGreaterThan(0);
      expect(stage.headline.length).toBeGreaterThan(0);
      expect(stage.description.length).toBeGreaterThan(0);
      expect(stage.overview.length).toBeGreaterThan(0);
      expect(stage.commonMistake.length).toBeGreaterThan(0);
      expect(stage.approach.length).toBeGreaterThan(0);
      expect(stage.deliverables.length).toBeGreaterThan(0);
    }
  });
});
