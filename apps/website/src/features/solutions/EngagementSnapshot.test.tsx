import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SOLUTIONS } from "./data/solutions";
import { EngagementSnapshot } from "./EngagementSnapshot";

function requireSolution(slug: string) {
  const found = SOLUTIONS.find((candidate) => candidate.slug === slug);
  if (!found) throw new Error(`Missing ${slug} solution fixture`);
  return found;
}

const solution = requireSolution("startup");

describe("EngagementSnapshot", () => {
  it("renders the timeline, every team role, and the investment guidance", () => {
    render(<EngagementSnapshot solution={solution} />);

    expect(screen.getByText(solution.deliveryTimeline)).toBeInTheDocument();
    for (const role of solution.teamComposition) {
      expect(screen.getByText(role)).toBeInTheDocument();
    }
    expect(screen.getByText(solution.investmentGuidance)).toBeInTheDocument();
  });
});
