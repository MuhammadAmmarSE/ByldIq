import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SOLUTIONS } from "./data/solutions";
import { SolutionOverview } from "./SolutionOverview";

const solution = SOLUTIONS.find((candidate) => candidate.slug === "commerce");
if (!solution) throw new Error("Missing commerce solution fixture");

describe("SolutionOverview", () => {
  it("renders the business problem, every outcome, and the engineering philosophy", () => {
    render(<SolutionOverview solution={solution} />);

    expect(screen.getByText(solution.businessProblem)).toBeInTheDocument();
    for (const outcome of solution.businessOutcomes) {
      expect(screen.getByText(outcome)).toBeInTheDocument();
    }
    expect(screen.getByText(solution.engineeringPhilosophy)).toBeInTheDocument();
  });

  it("gives each section a stable id for future in-page navigation", () => {
    const { container } = render(<SolutionOverview solution={solution} />);

    expect(container.querySelector("#business-problem")).toBeInTheDocument();
    expect(container.querySelector("#business-outcomes")).toBeInTheDocument();
    expect(container.querySelector("#engineering-philosophy")).toBeInTheDocument();
  });
});
