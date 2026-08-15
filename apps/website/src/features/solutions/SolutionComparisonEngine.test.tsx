import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { SolutionComparisonEngine } from "./SolutionComparisonEngine";

describe("SolutionComparisonEngine", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("defaults to SaaS Development vs Enterprise and tracks the initial comparison", () => {
    render(<SolutionComparisonEngine />);

    const table = screen.getByRole("table");
    expect(within(table).getByRole("link", { name: "SaaS Development" })).toBeInTheDocument();
    expect(within(table).getByRole("link", { name: "Enterprise" })).toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith("solution_comparison_viewed", {
      slugs: ["saas-development", "enterprise"],
    });
  });

  it("switches to a popular comparison on click", async () => {
    const user = userEvent.setup();
    render(<SolutionComparisonEngine />);

    await user.click(screen.getByRole("button", { name: "Startup MVP vs Dedicated Teams" }));

    const table = screen.getByRole("table");
    expect(within(table).getByRole("link", { name: "Startup" })).toBeInTheDocument();
    expect(within(table).getByRole("link", { name: "Dedicated Teams" })).toBeInTheDocument();
  });

  it("renders the same dimensions for both solutions without declaring a winner", () => {
    render(<SolutionComparisonEngine />);

    expect(screen.getByText("Who it's for")).toBeInTheDocument();
    expect(screen.getByText("Timeline")).toBeInTheDocument();
    expect(screen.getByText("Investment")).toBeInTheDocument();
    expect(screen.getByText("Outcomes")).toBeInTheDocument();
    expect(screen.getByText(/no universal answer/i)).toBeInTheDocument();
  });
});
