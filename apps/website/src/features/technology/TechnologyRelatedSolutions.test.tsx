import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: vi.fn() }),
}));

import { SOLUTIONS } from "@/features/solutions";

import { TECHNOLOGIES } from "./data/technologies";
import { TechnologyRelatedSolutions } from "./TechnologyRelatedSolutions";

const nextJs = TECHNOLOGIES.find((candidate) => candidate.slug === "next-js");
if (!nextJs) throw new Error("Missing next-js fixture");

const mongoDb = TECHNOLOGIES.find((candidate) => candidate.slug === "mongodb");
if (!mongoDb) throw new Error("Missing mongodb fixture");

describe("TechnologyRelatedSolutions", () => {
  it("renders a card for every related solution", () => {
    render(<TechnologyRelatedSolutions technology={nextJs} />);

    expect(screen.getByRole("heading", { name: "Where this shows up" })).toBeInTheDocument();
    for (const slug of nextJs.relatedSolutionSlugs) {
      const solution = SOLUTIONS.find((candidate) => candidate.slug === slug);
      if (!solution) throw new Error(`Missing ${slug} solution fixture`);
      expect(screen.getByRole("link", { name: new RegExp(solution.navLabel) })).toHaveAttribute(
        "href",
        `/solutions/${solution.slug}`,
      );
    }
  });

  it("renders nothing when there are no related solutions", () => {
    const { container } = render(<TechnologyRelatedSolutions technology={mongoDb} />);
    expect(container).toBeEmptyDOMElement();
  });
});
