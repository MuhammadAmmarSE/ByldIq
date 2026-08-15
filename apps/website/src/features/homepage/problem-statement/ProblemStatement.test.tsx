import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { PAIN_POINTS } from "./data/pain-points";
import { ProblemStatement } from "./ProblemStatement";

describe("ProblemStatement", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders the heading and every pain point title", () => {
    render(<ProblemStatement />);

    expect(
      screen.getByRole("heading", {
        name: "Most software projects don't fail because of bad code.",
      }),
    ).toBeInTheDocument();

    for (const point of PAIN_POINTS) {
      expect(screen.getByRole("button", { name: new RegExp(point.title) })).toBeInTheDocument();
    }
  });

  it("cites a real source for both statistics", () => {
    render(<ProblemStatement />);
    expect(screen.getAllByText(/McKinsey & Company/).length).toBeGreaterThan(0);
  });

  it("expands a pain point to reveal Byld IQ's response and tracks it", async () => {
    const user = userEvent.setup();
    render(<ProblemStatement />);

    const [firstPoint] = PAIN_POINTS;
    if (!firstPoint) throw new Error("Expected at least one pain point fixture");

    await user.click(screen.getByRole("button", { name: new RegExp(firstPoint.title) }));

    expect(screen.getByText(firstPoint.response)).toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith("problem_pain_point_expanded", { id: firstPoint.id });
  });
});
