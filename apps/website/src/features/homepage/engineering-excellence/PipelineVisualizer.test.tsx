import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { PIPELINE_STAGES } from "./data/pipeline-stages";
import { PipelineVisualizer } from "./PipelineVisualizer";

function requireStage(id: string) {
  const stage = PIPELINE_STAGES.find((candidate) => candidate.id === id);
  if (!stage) throw new Error(`Missing pipeline stage fixture: ${id}`);
  return stage;
}

describe("PipelineVisualizer", () => {
  it("shows the first stage's description by default", () => {
    render(<PipelineVisualizer />);
    expect(screen.getByText(requireStage("commit").description)).toBeInTheDocument();
  });

  it("shows another stage's description on click and reports the selection", async () => {
    const user = userEvent.setup();
    const onStageSelect = vi.fn();
    render(<PipelineVisualizer onStageSelect={onStageSelect} />);

    await user.click(screen.getByRole("button", { name: "Lighthouse" }));

    expect(screen.getByText(requireStage("lighthouse").description)).toBeInTheDocument();
    expect(onStageSelect).toHaveBeenCalledWith("lighthouse");
  });
});
