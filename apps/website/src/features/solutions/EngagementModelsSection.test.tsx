import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { ENGAGEMENT_MODELS } from "./data/engagement-models";
import { EngagementModelsSection } from "./EngagementModelsSection";

describe("EngagementModelsSection", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders a trigger for every engagement model", () => {
    render(<EngagementModelsSection />);

    for (const model of ENGAGEMENT_MODELS) {
      expect(screen.getByRole("button", { name: new RegExp(model.label) })).toBeInTheDocument();
    }
  });

  it("expands a model to reveal its best-for, pros, process, and team structure, and tracks it", async () => {
    const user = userEvent.setup();
    render(<EngagementModelsSection />);

    const [firstModel] = ENGAGEMENT_MODELS;
    if (!firstModel) throw new Error("Expected at least one engagement model fixture");

    await user.click(screen.getByRole("button", { name: new RegExp(firstModel.label) }));

    for (const item of firstModel.bestFor) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
    for (const item of firstModel.teamStructure) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
    expect(mockTrack).toHaveBeenCalledWith("engagement_model_expanded", { slug: firstModel.slug });
  });

  it("links the Dedicated Team model to the full Dedicated Teams solution", async () => {
    const user = userEvent.setup();
    render(<EngagementModelsSection />);

    await user.click(screen.getByRole("button", { name: /dedicated team/i }));

    expect(
      screen.getByRole("link", { name: /see the full dedicated teams solution/i }),
    ).toHaveAttribute("href", "/solutions/dedicated-teams");
  });
});
