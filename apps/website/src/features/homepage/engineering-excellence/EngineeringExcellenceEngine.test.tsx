import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { ENGINEERING_PRACTICES } from "./data/practices";
import { EngineeringExcellenceEngine } from "./EngineeringExcellenceEngine";

describe("EngineeringExcellenceEngine", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders a trigger for every practice, collapsed by default", () => {
    render(<EngineeringExcellenceEngine />);

    for (const practice of ENGINEERING_PRACTICES) {
      expect(screen.getByRole("button", { name: practice.title })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    }
  });

  it("expands a practice on click, revealing its points, and tracks it", async () => {
    const user = userEvent.setup();
    render(<EngineeringExcellenceEngine />);

    const security = ENGINEERING_PRACTICES.find((practice) => practice.id === "security");
    if (!security) throw new Error("Missing security practice fixture");

    await user.click(screen.getByRole("button", { name: security.title }));

    const [firstPoint] = security.points;
    if (!firstPoint) throw new Error("Security practice must have at least one point");
    expect(screen.getByText(firstPoint)).toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith("engineering_practice_expanded", {
      practice: "security",
    });
  });
});
