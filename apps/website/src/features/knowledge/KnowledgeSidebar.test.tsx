import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const mockUseScrollSpy = vi.fn();

vi.mock("@/hooks/useScrollSpy", () => ({
  useScrollSpy: (...args: unknown[]) => mockUseScrollSpy(...args),
}));

import { KnowledgeSidebar } from "./KnowledgeSidebar";

describe("KnowledgeSidebar", () => {
  it("renders a link for every section", () => {
    mockUseScrollSpy.mockReturnValue(null);
    render(<KnowledgeSidebar />);

    expect(screen.getByRole("link", { name: "Who this is for" })).toHaveAttribute(
      "href",
      "#who-this-is-for",
    );
    expect(screen.getByRole("link", { name: "Related learning" })).toHaveAttribute(
      "href",
      "#related-learning",
    );
  });

  it("marks the currently active section returned by the scrollspy hook", () => {
    mockUseScrollSpy.mockReturnValue("core-concepts");
    render(<KnowledgeSidebar />);

    expect(screen.getByRole("link", { name: "Core concepts" })).toHaveAttribute(
      "aria-current",
      "location",
    );
    expect(screen.getByRole("link", { name: "Who this is for" })).not.toHaveAttribute(
      "aria-current",
    );
  });
});
