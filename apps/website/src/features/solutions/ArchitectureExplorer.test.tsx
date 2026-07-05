import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { SOLUTIONS } from "./data/solutions";
import { ArchitectureExplorer } from "./ArchitectureExplorer";

function requireSolution(slug: string) {
  const found = SOLUTIONS.find((candidate) => candidate.slug === slug);
  if (!found) throw new Error(`Missing ${slug} solution fixture`);
  return found;
}

const solution = requireSolution("startup");

describe("ArchitectureExplorer", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders every node and shows the first node's description by default", () => {
    render(<ArchitectureExplorer solution={solution} />);

    const [firstNode] = solution.architecture;
    if (!firstNode) throw new Error("Solution has no architecture nodes");

    for (const node of solution.architecture) {
      expect(screen.getByRole("button", { name: node.label })).toBeInTheDocument();
    }
    expect(screen.getByRole("button", { name: firstNode.label })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByText(firstNode.description)).toBeInTheDocument();
  });

  it("shows another node's description on click and tracks the selection", async () => {
    const user = userEvent.setup();
    render(<ArchitectureExplorer solution={solution} />);

    const secondNode = solution.architecture[1];
    if (!secondNode) throw new Error("Solution needs at least two architecture nodes");

    await user.click(screen.getByRole("button", { name: secondNode.label }));

    expect(screen.getByText(secondNode.description)).toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith("solution_architecture_node_selected", {
      slug: solution.slug,
      node: secondNode.id,
    });
  });
});
