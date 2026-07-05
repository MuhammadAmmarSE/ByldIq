import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { DELIVERY_STAGES } from "./data/delivery-stages";
import { SOLUTIONS } from "./data/solutions";
import { DeliveryFramework } from "./DeliveryFramework";

function requireSolution(slug: string) {
  const found = SOLUTIONS.find((candidate) => candidate.slug === slug);
  if (!found) throw new Error(`Missing ${slug} solution fixture`);
  return found;
}

const solution = requireSolution("startup");

describe("DeliveryFramework", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders every stage and shows the first stage's description by default", () => {
    render(<DeliveryFramework solution={solution} />);

    const [firstStage] = DELIVERY_STAGES;
    if (!firstStage) throw new Error("No delivery stages defined");

    for (const stage of DELIVERY_STAGES) {
      expect(screen.getByRole("button", { name: stage.label })).toBeInTheDocument();
    }
    expect(screen.getByRole("button", { name: firstStage.label })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByText(firstStage.description)).toBeInTheDocument();
  });

  it("shows another stage's description on click and tracks the selection with the solution slug", async () => {
    const user = userEvent.setup();
    render(<DeliveryFramework solution={solution} />);

    const secondStage = DELIVERY_STAGES[1];
    if (!secondStage) throw new Error("Need at least two delivery stages");

    await user.click(screen.getByRole("button", { name: secondStage.label }));

    expect(screen.getByText(secondStage.description)).toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith("solution_delivery_stage_selected", {
      slug: solution.slug,
      stage: secondStage.id,
    });
  });
});
