import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { SOLUTIONS } from "./data/solutions";
import { CapabilityExplorer } from "./CapabilityExplorer";

function requireSolution(slug: string) {
  const found = SOLUTIONS.find((candidate) => candidate.slug === slug);
  if (!found) throw new Error(`Missing ${slug} solution fixture`);
  return found;
}

const solution = requireSolution("startup");

describe("CapabilityExplorer", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders every capability as a collapsed accordion trigger", () => {
    render(<CapabilityExplorer solution={solution} />);

    for (const capability of solution.capabilities) {
      expect(screen.getByRole("button", { name: capability.title })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    }
  });

  it("expands a capability to reveal why/when/benefits/risks/timeline, and tracks it", async () => {
    const user = userEvent.setup();
    render(<CapabilityExplorer solution={solution} />);

    const [firstCapability] = solution.capabilities;
    if (!firstCapability) throw new Error("Solution has no capabilities");

    await user.click(screen.getByRole("button", { name: firstCapability.title }));

    expect(screen.getByText(firstCapability.why)).toBeInTheDocument();
    expect(screen.getByText(firstCapability.when)).toBeInTheDocument();
    expect(screen.getByText(firstCapability.timeline)).toBeInTheDocument();
    for (const benefit of firstCapability.benefits) {
      expect(screen.getByText(benefit)).toBeInTheDocument();
    }

    expect(mockTrack).toHaveBeenCalledWith("solution_capability_expanded", {
      slug: solution.slug,
      capability: firstCapability.id,
    });
  });
});
