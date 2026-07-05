import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { BUILDPATH_GOALS } from "./data/goals";
import { BuildPathPreview } from "./BuildPathPreview";

describe("BuildPathPreview", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("shows a default Phase 1 description until a goal is selected", () => {
    render(<BuildPathPreview />);
    expect(screen.getByText(/choose a goal above/i)).toBeInTheDocument();
  });

  it("updates the roadmap preview live when a goal is selected, and tracks it", async () => {
    const user = userEvent.setup();
    render(<BuildPathPreview />);

    const startupGoal = BUILDPATH_GOALS.find((goal) => goal.id === "launch-startup");
    if (!startupGoal) throw new Error("Missing launch-startup goal fixture");

    await user.click(screen.getByRole("button", { name: startupGoal.label }));

    expect(screen.getByText(startupGoal.recommendation)).toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith("buildpath_preview_goal_selected", {
      goal: "launch-startup",
    });
  });

  it("links the CTA to the real /buildpath route and tracks the click", async () => {
    const user = userEvent.setup();
    render(<BuildPathPreview />);

    const cta = screen.getByRole("link", { name: /continue in buildpath/i });
    expect(cta).toHaveAttribute("href", "/buildpath");

    await user.click(cta);
    expect(mockTrack).toHaveBeenCalledWith("buildpath_preview_cta_clicked", {});
  });
});
