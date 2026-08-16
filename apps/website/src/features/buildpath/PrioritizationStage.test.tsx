import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: vi.fn() }),
}));

import { BuildPathStoreProvider } from "@/providers/BuildPathStoreProvider";

import { PrioritizationStage } from "./PrioritizationStage";

describe("PrioritizationStage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders both AI suggestions and the feature board", () => {
    render(
      <BuildPathStoreProvider>
        <PrioritizationStage />
      </BuildPathStoreProvider>,
    );

    expect(screen.getByText("AI Feature Suggestions")).toBeInTheDocument();
    expect(screen.getByText("Add a feature")).toBeInTheDocument();
    expect(screen.getByText("MVP — Must have (0)")).toBeInTheDocument();
  });
});
