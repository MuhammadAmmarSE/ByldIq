import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { TechnologyPhilosophyFlow } from "./TechnologyPhilosophyFlow";

describe("TechnologyPhilosophyFlow", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders the full decision funnel ending in a technology decision", () => {
    render(<TechnologyPhilosophyFlow />);

    for (const input of [
      "Business Requirements",
      "Product Constraints",
      "Team Capability",
      "Performance",
      "Scalability",
      "Security",
      "Cost",
    ]) {
      expect(screen.getByText(input)).toBeInTheDocument();
    }
    expect(screen.getByText("Technology Decision")).toBeInTheDocument();
  });

  it("gives the section a stable id for the sidebar", () => {
    const { container } = render(<TechnologyPhilosophyFlow />);
    expect(container.querySelector("#technology-philosophy")).toBeInTheDocument();
  });

  it("links to the real Technology Explorer, and tracks the click", async () => {
    const user = userEvent.setup();
    render(<TechnologyPhilosophyFlow />);

    const link = screen.getByRole("link", { name: /explore technology decisions/i });
    expect(link).toHaveAttribute("href", "/technology");

    await user.click(link);
    expect(mockTrack).toHaveBeenCalledWith("about_technology_explorer_clicked", {});
  });
});
