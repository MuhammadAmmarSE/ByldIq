import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: vi.fn() }),
}));

import { BuildPathStoreProvider } from "@/providers/BuildPathStoreProvider";

import { ArchitectureStage } from "./ArchitectureStage";

function renderStage() {
  return render(
    <BuildPathStoreProvider>
      <ArchitectureStage />
    </BuildPathStoreProvider>,
  );
}

describe("ArchitectureStage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("adds an Authentication node to the diagram once that integration is toggled on", async () => {
    const user = userEvent.setup();
    renderStage();

    // Only the Integrations toggle exists before it's turned on — the diagram has no Authentication node yet.
    expect(screen.getAllByRole("button", { name: "Authentication" })).toHaveLength(1);

    const [integrationToggle] = screen.getAllByRole("button", { name: "Authentication" });
    if (!integrationToggle) throw new Error("Expected the Authentication toggle to render");
    await user.click(integrationToggle);

    // Now both the toggle and the new diagram node chip are named "Authentication."
    expect(screen.getAllByRole("button", { name: "Authentication" })).toHaveLength(2);
  });
});
