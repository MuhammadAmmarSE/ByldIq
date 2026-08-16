import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: vi.fn() }),
}));

import { BuildPathStoreProvider, useBuildPathStore } from "@/providers/BuildPathStoreProvider";

import { AiFeatureSuggestions } from "./AiFeatureSuggestions";

function Harness() {
  const features = useBuildPathStore((state) => state.features);
  const toggleProjectType = useBuildPathStore((state) => state.toggleProjectType);
  return (
    <>
      <button onClick={() => toggleProjectType("E-commerce")}>Set E-commerce</button>
      <AiFeatureSuggestions />
      <ul>
        {features.map((feature) => (
          <li key={feature.id} data-testid="feature">
            {feature.name} ({feature.priority}, {feature.source})
          </li>
        ))}
      </ul>
    </>
  );
}

function renderSuggestions() {
  return render(
    <BuildPathStoreProvider>
      <Harness />
    </BuildPathStoreProvider>,
  );
}

describe("AiFeatureSuggestions", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows no pending suggestions until Byld is asked", () => {
    renderSuggestions();
    expect(screen.getByText(/no pending suggestions/i)).toBeInTheDocument();
  });

  it("surfaces suggestions relevant to the selected project type", async () => {
    const user = userEvent.setup();
    renderSuggestions();

    await user.click(screen.getByRole("button", { name: "Set E-commerce" }));
    await user.click(screen.getByRole("button", { name: "Ask Byld for suggestions" }));

    expect(screen.getByText("Cart Abandonment Recovery")).toBeInTheDocument();
  });

  it("reveals the reason only after Ask why is clicked", async () => {
    const user = userEvent.setup();
    renderSuggestions();

    await user.click(screen.getByRole("button", { name: "Set E-commerce" }));
    await user.click(screen.getByRole("button", { name: "Ask Byld for suggestions" }));

    expect(screen.queryByText(/highest-return features/i)).not.toBeInTheDocument();
    const [askWhyButton] = screen.getAllByRole("button", { name: "Ask why" });
    if (!askWhyButton) throw new Error("Expected at least one pending suggestion");
    await user.click(askWhyButton);
    expect(screen.getByText(/highest-return features/i)).toBeInTheDocument();
  });

  it("adds a suggestion as a real feature, sourced from AI", async () => {
    const user = userEvent.setup();
    renderSuggestions();

    await user.click(screen.getByRole("button", { name: "Set E-commerce" }));
    await user.click(screen.getByRole("button", { name: "Ask Byld for suggestions" }));
    const [addButton] = screen.getAllByRole("button", { name: "Add" });
    if (!addButton) throw new Error("Expected at least one pending suggestion");
    await user.click(addButton);

    expect(screen.getByTestId("feature")).toHaveTextContent("(should, ai)");
  });

  it("removes a suggestion from the pending list when ignored, without adding a feature", async () => {
    const user = userEvent.setup();
    renderSuggestions();

    await user.click(screen.getByRole("button", { name: "Set E-commerce" }));
    await user.click(screen.getByRole("button", { name: "Ask Byld for suggestions" }));
    const [ignoreButton] = screen.getAllByRole("button", { name: "Ignore" });
    if (!ignoreButton) throw new Error("Expected at least one pending suggestion");
    await user.click(ignoreButton);

    expect(screen.queryByText("Cart Abandonment Recovery")).not.toBeInTheDocument();
    expect(screen.queryByTestId("feature")).not.toBeInTheDocument();
  });
});
