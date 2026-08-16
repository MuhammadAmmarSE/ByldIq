import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SOLUTIONS } from "./data/solutions";
import { SolutionCard } from "./SolutionCard";

const solution = SOLUTIONS.find((candidate) => candidate.slug === "startup");
if (!solution) throw new Error("Missing startup solution fixture");

describe("SolutionCard", () => {
  it("renders as a link to the solution page", () => {
    render(<SolutionCard solution={solution} />);

    const link = screen.getByRole("link", { name: new RegExp(solution.navLabel) });
    expect(link).toHaveAttribute("href", `/solutions/${solution.slug}`);
  });

  it("shows the recommended badge only when isRecommended is set", () => {
    const { rerender } = render(<SolutionCard solution={solution} />);
    expect(screen.queryByText("Recommended for you")).not.toBeInTheDocument();

    rerender(<SolutionCard solution={solution} isRecommended />);
    expect(screen.getByText("Recommended for you")).toBeInTheDocument();
  });

  it("calls onSelect on click and onHover on pointer enter", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const onHover = vi.fn();
    render(<SolutionCard solution={solution} onSelect={onSelect} onHover={onHover} />);

    const link = screen.getByRole("link", { name: new RegExp(solution.navLabel) });
    await user.hover(link);
    expect(onHover).toHaveBeenCalledWith(solution.slug);

    await user.click(link);
    expect(onSelect).toHaveBeenCalledWith(solution.slug);
  });

  it("shows the solution's typical companies and technologies", () => {
    render(<SolutionCard solution={solution} />);

    expect(screen.getByText(solution.typicalCompanies.join(" · "))).toBeInTheDocument();
    const [firstTechnology] = solution.technologies;
    if (firstTechnology) {
      expect(screen.getByText(firstTechnology.name)).toBeInTheDocument();
    }
  });

  it("stays shrinkable inside a CSS grid despite its truncated architecture preview", () => {
    // Regression test: a grid item's default `min-width: auto` sizes to its
    // content's intrinsic minimum — and a `truncate` (whitespace-nowrap)
    // child's intrinsic minimum is its full, un-wrapped text width. Without
    // `min-w-0` here, a long `architecturePreview` string forced this card
    // (and the whole grid row) wider than the viewport on mobile. See
    // `docs/solutions.md` and `IndustryDetail.tsx`'s grid.
    render(<SolutionCard solution={solution} />);
    const link = screen.getByRole("link", { name: new RegExp(solution.navLabel) });
    expect(link).toHaveClass("min-w-0");
  });
});
