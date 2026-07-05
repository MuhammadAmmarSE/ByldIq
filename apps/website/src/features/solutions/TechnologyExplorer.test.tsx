import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { SOLUTIONS } from "./data/solutions";
import { TechnologyExplorer } from "./TechnologyExplorer";

function requireSolution(slug: string) {
  const found = SOLUTIONS.find((candidate) => candidate.slug === slug);
  if (!found) throw new Error(`Missing ${slug} solution fixture`);
  return found;
}

const solution = requireSolution("startup");

describe("TechnologyExplorer", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders every technology as a collapsed accordion trigger", () => {
    render(<TechnologyExplorer solution={solution} />);

    for (const technology of solution.technologies) {
      expect(screen.getByRole("button", { name: technology.name })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    }
  });

  it("expands a technology to reveal why/when/trade-offs/alternatives, and tracks it", async () => {
    const user = userEvent.setup();
    render(<TechnologyExplorer solution={solution} />);

    const [firstTechnology] = solution.technologies;
    if (!firstTechnology) throw new Error("Solution has no technologies");

    await user.click(screen.getByRole("button", { name: firstTechnology.name }));

    expect(screen.getByText(firstTechnology.why)).toBeInTheDocument();
    expect(screen.getByText(firstTechnology.when)).toBeInTheDocument();
    expect(screen.getByText(firstTechnology.tradeoffs)).toBeInTheDocument();
    expect(screen.getByText(firstTechnology.cost)).toBeInTheDocument();
    for (const alternative of firstTechnology.alternatives) {
      expect(screen.getByText(alternative)).toBeInTheDocument();
    }

    expect(mockTrack).toHaveBeenCalledWith("solution_technology_selected", {
      slug: solution.slug,
      technology: firstTechnology.id,
    });
  });
});
