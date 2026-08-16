import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: vi.fn() }),
}));

import { BuildPathStoreProvider } from "@/providers/BuildPathStoreProvider";

import { DiscoveryStage } from "./DiscoveryStage";

function renderStage() {
  return render(
    <BuildPathStoreProvider>
      <DiscoveryStage />
    </BuildPathStoreProvider>,
  );
}

describe("DiscoveryStage", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the conversation, structured recap, problem definition, and target users", async () => {
    renderStage();

    expect(await screen.findByLabelText("Reply to Byld")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Or edit your answers directly" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Problem definition" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Target users" })).toBeInTheDocument();
  });

  it("keeps the conversation and structured recap in sync", async () => {
    renderStage();
    await screen.findByLabelText("Reply to Byld");

    const [accomplishField] = screen.getAllByLabelText(
      "What are you trying to build or accomplish?",
    );
    expect(accomplishField).toHaveValue("");
  });
});
