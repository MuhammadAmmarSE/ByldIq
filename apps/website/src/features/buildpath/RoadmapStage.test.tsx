import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: vi.fn() }),
}));

import { BuildPathStoreProvider } from "@/providers/BuildPathStoreProvider";

import { RoadmapStage } from "./RoadmapStage";

function renderStage() {
  return render(
    <BuildPathStoreProvider>
      <RoadmapStage />
    </BuildPathStoreProvider>,
  );
}

describe("RoadmapStage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows all six phases, with the first expanded by default", () => {
    renderStage();

    expect(screen.getByRole("button", { name: /Phase 1: Discovery & Planning/ })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByRole("button", { name: /Phase 6: Growth & Iteration/ })).toBeInTheDocument();
    expect(screen.getByText("Confirmed problem definition")).toBeInTheDocument();
  });

  it("switches phases on click, collapsing the previous one", async () => {
    const user = userEvent.setup();
    renderStage();

    await user.click(screen.getByRole("button", { name: /Phase 3: Core Build/ }));

    expect(screen.getByRole("button", { name: /Phase 3: Core Build/ })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByRole("button", { name: /Phase 1: Discovery & Planning/ })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
});
