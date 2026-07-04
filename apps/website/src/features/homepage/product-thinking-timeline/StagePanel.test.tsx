import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TIMELINE_STAGES } from "./data/stages";
import { StagePanel } from "./StagePanel";

const architecture = TIMELINE_STAGES.find((stage) => stage.id === "architecture");
if (!architecture) throw new Error("Missing architecture stage fixture");

describe("StagePanel", () => {
  it("renders the stage's headline, overview, mistake, approach, and deliverables", () => {
    render(<StagePanel stage={architecture} />);

    expect(screen.getByText(architecture.headline)).toBeInTheDocument();
    expect(screen.getByText(architecture.overview)).toBeInTheDocument();
    expect(screen.getByText(architecture.commonMistake)).toBeInTheDocument();
    expect(screen.getByText(architecture.approach)).toBeInTheDocument();
    for (const deliverable of architecture.deliverables) {
      expect(screen.getByText(deliverable)).toBeInTheDocument();
    }
  });

  it("omits the technologies section when a stage has none", () => {
    const idea = TIMELINE_STAGES.find((stage) => stage.id === "idea");
    if (!idea) throw new Error("Missing idea stage fixture");

    render(<StagePanel stage={idea} />);
    expect(screen.queryByText("Related technologies")).not.toBeInTheDocument();
  });
});
