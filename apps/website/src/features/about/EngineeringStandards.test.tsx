import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { ENGINEERING_STANDARDS } from "./data/engineering-standards";
import { EngineeringStandards } from "./EngineeringStandards";

describe("EngineeringStandards", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders every principle's title and statement", () => {
    render(<EngineeringStandards />);

    for (const standard of ENGINEERING_STANDARDS) {
      expect(screen.getByText(standard.title)).toBeInTheDocument();
      expect(screen.getByText(standard.statement)).toBeInTheDocument();
    }
  });

  it("gives the section a stable id for the sidebar", () => {
    const { container } = render(<EngineeringStandards />);
    expect(container.querySelector("#engineering-standards")).toBeInTheDocument();
  });

  it("links to the homepage's Engineering Excellence section, and tracks the click", async () => {
    const user = userEvent.setup();
    render(<EngineeringStandards />);

    const link = screen.getByRole("link", { name: "See it in practice" });
    expect(link).toHaveAttribute("href", "/#engineering-excellence");

    await user.click(link);
    expect(mockTrack).toHaveBeenCalledWith("about_cta_selected", {
      cta: "engineering-excellence",
    });
  });

  it("tracks about_engineering_principle_viewed on hover", async () => {
    const user = userEvent.setup();
    render(<EngineeringStandards />);
    const [first] = ENGINEERING_STANDARDS;
    if (!first) throw new Error("No engineering standards defined");

    await user.hover(screen.getByText(first.title));
    expect(mockTrack).toHaveBeenCalledWith("about_engineering_principle_viewed", {
      principle: first.id,
    });
  });
});
