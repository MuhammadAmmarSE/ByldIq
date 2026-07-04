import { describe, expect, it } from "vitest";

import { PIPELINE_STAGES } from "./pipeline-stages";

describe("PIPELINE_STAGES", () => {
  it("starts at commit and ends at merge", () => {
    expect(PIPELINE_STAGES[0]?.id).toBe("commit");
    expect(PIPELINE_STAGES.at(-1)?.id).toBe("merge");
  });

  it("gives every stage a label and description", () => {
    for (const stage of PIPELINE_STAGES) {
      expect(stage.label.length).toBeGreaterThan(0);
      expect(stage.description.length).toBeGreaterThan(0);
    }
  });
});
