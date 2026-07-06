import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { TECHNOLOGIES } from "./data/technologies";
import { TechnologyTradeOffExplorer } from "./TechnologyTradeOffExplorer";

const technology = TECHNOLOGIES.find((candidate) => candidate.slug === "kubernetes");
if (!technology) throw new Error("Missing kubernetes fixture");

describe("TechnologyTradeOffExplorer", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders the quick facts and the Best For tab by default", () => {
    render(<TechnologyTradeOffExplorer technology={technology} />);

    expect(screen.getByText(technology.tradeOff.cost)).toBeInTheDocument();
    expect(screen.getByText(technology.tradeOff.complexity)).toBeInTheDocument();
    for (const item of technology.tradeOff.bestFor) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
    expect(screen.queryByText(technology.tradeOff.avoidWhen[0] ?? "")).not.toBeInTheDocument();
  });

  it("switches to Avoid When and tracks it", async () => {
    const user = userEvent.setup();
    render(<TechnologyTradeOffExplorer technology={technology} />);

    await user.click(screen.getByRole("tab", { name: "Avoid when" }));

    for (const item of technology.tradeOff.avoidWhen) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
    expect(mockTrack).toHaveBeenCalledWith("technology_trade_off_expanded", {
      slug: technology.slug,
      section: "avoid-when",
    });
  });

  it("switches to Alternatives", async () => {
    const user = userEvent.setup();
    render(<TechnologyTradeOffExplorer technology={technology} />);

    await user.click(screen.getByRole("tab", { name: "Alternatives" }));

    for (const alternative of technology.tradeOff.alternatives) {
      expect(screen.getByText(alternative)).toBeInTheDocument();
    }
  });
});
