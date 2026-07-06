import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const mockUseScrollSpy = vi.fn();

vi.mock("@/hooks/useScrollSpy", () => ({
  useScrollSpy: (...args: unknown[]) => mockUseScrollSpy(...args),
}));

import { TechnologySidebar } from "./TechnologySidebar";

describe("TechnologySidebar", () => {
  it("renders a link for every section", () => {
    mockUseScrollSpy.mockReturnValue(null);
    render(<TechnologySidebar />);

    expect(screen.getByRole("link", { name: "The problem" })).toHaveAttribute(
      "href",
      "#business-problem",
    );
    expect(screen.getByRole("link", { name: "Common questions" })).toHaveAttribute("href", "#faq");
  });

  it("marks the currently active section returned by the scrollspy hook", () => {
    mockUseScrollSpy.mockReturnValue("trade-off-explorer");
    render(<TechnologySidebar />);

    expect(screen.getByRole("link", { name: "Trade-off explorer" })).toHaveAttribute(
      "aria-current",
      "location",
    );
    expect(screen.getByRole("link", { name: "The problem" })).not.toHaveAttribute("aria-current");
  });
});
