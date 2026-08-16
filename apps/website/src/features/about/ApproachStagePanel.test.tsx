import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { APPROACH_STAGES } from "./data/approach-stages";
import { ApproachStagePanel } from "./ApproachStagePanel";

const [stage] = APPROACH_STAGES;
if (!stage) throw new Error("Missing approach stage fixture");

describe("ApproachStagePanel", () => {
  it("renders the stage's headline, narrative fields, and deliverables", () => {
    render(<ApproachStagePanel stage={stage} />);

    expect(screen.getByRole("heading", { name: stage.headline })).toBeInTheDocument();
    expect(screen.getByText(stage.whatHappens)).toBeInTheDocument();
    expect(screen.getByText(stage.whoParticipates)).toBeInTheDocument();
    expect(screen.getByText(stage.typicalDecisions)).toBeInTheDocument();
    expect(screen.getByText(stage.howAiAssists)).toBeInTheDocument();
    expect(screen.getByText(stage.successLooksLike)).toBeInTheDocument();
    for (const deliverable of stage.deliverables) {
      expect(screen.getByText(deliverable)).toBeInTheDocument();
    }
  });
});
