import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { APPROACH_STAGES } from "./data/approach-stages";
import { ApproachTimeline } from "./ApproachTimeline";

describe("ApproachTimeline", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("gives the section a stable id and shows the first stage by default", () => {
    const { container } = render(<ApproachTimeline />);

    expect(container.querySelector("#approach")).toBeInTheDocument();
    const [firstStage] = APPROACH_STAGES;
    if (!firstStage) throw new Error("No approach stages defined");
    expect(screen.getByRole("heading", { name: firstStage.headline })).toBeInTheDocument();
  });

  it("switches stages on tab selection, and tracks it", async () => {
    const user = userEvent.setup();
    render(<ApproachTimeline />);

    const secondStage = APPROACH_STAGES[1];
    if (!secondStage) throw new Error("Need at least two approach stages");

    await user.click(screen.getByRole("tab", { name: new RegExp(secondStage.title) }));

    expect(screen.getByRole("heading", { name: secondStage.headline })).toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith("about_approach_stage_viewed", {
      stage: secondStage.id,
    });
  });

  it("renders a tab for every stage in order", () => {
    render(<ApproachTimeline />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(APPROACH_STAGES.length);
    APPROACH_STAGES.forEach((stage, index) => {
      expect(tabs[index]).toHaveTextContent(stage.title);
    });
  });
});
