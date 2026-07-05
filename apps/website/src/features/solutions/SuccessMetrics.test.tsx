import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SOLUTIONS } from "./data/solutions";
import { SuccessMetrics } from "./SuccessMetrics";

function requireSolution(slug: string) {
  const found = SOLUTIONS.find((candidate) => candidate.slug === slug);
  if (!found) throw new Error(`Missing ${slug} solution fixture`);
  return found;
}

const solution = requireSolution("startup");

describe("SuccessMetrics", () => {
  it("renders every metric's value and label", () => {
    render(<SuccessMetrics solution={solution} />);

    for (const metric of solution.successMetrics) {
      expect(screen.getByText(metric.value)).toBeInTheDocument();
      expect(screen.getByText(metric.label)).toBeInTheDocument();
    }
  });
});
