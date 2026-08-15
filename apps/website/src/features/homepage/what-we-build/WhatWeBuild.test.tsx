import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { SOLUTIONS } from "@/features/solutions";

import { WhatWeBuild } from "./WhatWeBuild";

describe("WhatWeBuild", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders a card linking to every real solution", () => {
    render(<WhatWeBuild />);

    for (const solution of SOLUTIONS) {
      expect(screen.getByRole("link", { name: new RegExp(solution.navLabel) })).toHaveAttribute(
        "href",
        `/solutions/${solution.slug}`,
      );
    }
  });

  it("tracks a card click", async () => {
    const user = userEvent.setup();
    render(<WhatWeBuild />);

    const [firstSolution] = SOLUTIONS;
    if (!firstSolution) throw new Error("Expected at least one solution fixture");

    await user.click(screen.getByRole("link", { name: new RegExp(firstSolution.navLabel) }));
    expect(mockTrack).toHaveBeenCalledWith("what_we_build_card_clicked", {
      slug: firstSolution.slug,
    });
  });
});
