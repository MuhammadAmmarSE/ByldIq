import { render, screen } from "@testing-library/react";
import { useEffect } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { StoreProvider, useAppStore } from "@/providers/StoreProvider";

import { SOLUTIONS } from "./data/solutions";
import { SolutionSelector } from "./SolutionSelector";

function renderSelector() {
  return render(
    <StoreProvider>
      <SolutionSelector />
    </StoreProvider>,
  );
}

describe("SolutionSelector", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders every solution as a listed link", () => {
    renderSelector();

    const list = screen.getByRole("list", { name: /explore solutions/i });
    expect(list).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(SOLUTIONS.length);

    const hrefs = screen.getAllByRole("link").map((link) => link.getAttribute("href"));
    for (const solution of SOLUTIONS) {
      expect(hrefs).toContain(`/solutions/${solution.slug}`);
    }
  });

  it("recommends no solution when no journey is selected", () => {
    renderSelector();
    expect(screen.queryByText("Recommended for you")).not.toBeInTheDocument();
  });

  it("recommends the matching solution once a journey is set", () => {
    function Harness() {
      const setJourney = useAppStore((state) => state.setJourney);
      useEffect(() => setJourney("commerce"), [setJourney]);
      return <SolutionSelector />;
    }

    render(
      <StoreProvider>
        <Harness />
      </StoreProvider>,
    );

    expect(screen.getByText("Recommended for you")).toBeInTheDocument();
    const recommendedCard = screen.getByText("Recommended for you").closest("a");
    expect(recommendedCard).toHaveAttribute("href", "/solutions/commerce");
  });
});
