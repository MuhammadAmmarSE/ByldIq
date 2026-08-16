import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: vi.fn() }),
}));

import { BuildPathStoreProvider } from "@/providers/BuildPathStoreProvider";

import { FeatureBoard } from "./FeatureBoard";

function renderBoard() {
  return render(
    <BuildPathStoreProvider>
      <FeatureBoard />
    </BuildPathStoreProvider>,
  );
}

describe("FeatureBoard", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows all four priority columns with zero counts", () => {
    renderBoard();
    expect(screen.getByText("MVP — Must have (0)")).toBeInTheDocument();
    expect(screen.getByText("V1 — Should have (0)")).toBeInTheDocument();
    expect(screen.getByText("Later — Could have (0)")).toBeInTheDocument();
    expect(screen.getByText("Future — Not now (0)")).toBeInTheDocument();
  });

  it("adds a feature into its default V1 column", async () => {
    const user = userEvent.setup();
    renderBoard();

    await user.type(screen.getByLabelText("Name"), "Online booking calendar");
    await user.click(screen.getByRole("button", { name: "Add feature" }));

    expect(screen.getByText("Online booking calendar")).toBeInTheDocument();
    expect(screen.getByText("V1 — Should have (1)")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveValue("");
  });

  it("removes a feature", async () => {
    const user = userEvent.setup();
    renderBoard();

    await user.type(screen.getByLabelText("Name"), "Online booking calendar");
    await user.click(screen.getByRole("button", { name: "Add feature" }));
    await user.click(screen.getByRole("button", { name: "Remove Online booking calendar" }));

    expect(screen.queryByText("Online booking calendar")).not.toBeInTheDocument();
  });

  it("disables Add feature until a name is entered", () => {
    renderBoard();
    expect(screen.getByRole("button", { name: "Add feature" })).toBeDisabled();
  });
});
