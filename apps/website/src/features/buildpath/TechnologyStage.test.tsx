import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: vi.fn() }),
}));

import { BuildPathStoreProvider } from "@/providers/BuildPathStoreProvider";

import { TechnologyStage } from "./TechnologyStage";

function renderStage() {
  return render(
    <BuildPathStoreProvider>
      <TechnologyStage />
    </BuildPathStoreProvider>,
  );
}

describe("TechnologyStage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the baseline stack with a working Technology Explorer link", () => {
    renderStage();

    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /more on next\.js/i })).toHaveAttribute(
      "href",
      "/technology/next-js",
    );
  });

  it("always explains the alternative and reasoning, never a bare name", () => {
    renderStage();
    expect(screen.getAllByText(/^Alternative:/).length).toBeGreaterThan(0);
  });
});
