import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const mockUseScrollSpy = vi.fn();

vi.mock("@/hooks/useScrollSpy", () => ({
  useScrollSpy: (...args: unknown[]) => mockUseScrollSpy(...args),
}));

import { SolutionSidebar } from "./SolutionSidebar";

describe("SolutionSidebar", () => {
  it("renders a link for every section", () => {
    mockUseScrollSpy.mockReturnValue(null);
    render(<SolutionSidebar />);

    expect(screen.getByRole("link", { name: "The problem" })).toHaveAttribute(
      "href",
      "#business-problem",
    );
    expect(screen.getByRole("link", { name: "Common questions" })).toHaveAttribute("href", "#faq");
  });

  it("marks the currently active section returned by the scrollspy hook", () => {
    mockUseScrollSpy.mockReturnValue("architecture");
    render(<SolutionSidebar />);

    expect(screen.getByRole("link", { name: "How it fits together" })).toHaveAttribute(
      "aria-current",
      "location",
    );
    expect(screen.getByRole("link", { name: "The problem" })).not.toHaveAttribute("aria-current");
  });
});
