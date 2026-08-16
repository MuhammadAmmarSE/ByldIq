import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { BuildPathStoreProvider, useBuildPathStore } from "@/providers/BuildPathStoreProvider";

import { AiOpportunitiesStage } from "./AiOpportunitiesStage";

function Harness() {
  const toggleProjectType = useBuildPathStore((state) => state.toggleProjectType);
  return (
    <>
      <button onClick={() => toggleProjectType("AI Product")}>Set AI Product</button>
      <AiOpportunitiesStage />
    </>
  );
}

function renderStage() {
  return render(
    <BuildPathStoreProvider>
      <Harness />
    </BuildPathStoreProvider>,
  );
}

describe("AiOpportunitiesStage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("is honest that AI isn't relevant when there's no signal for it", () => {
    renderStage();
    expect(screen.getByText("No AI recommended")).toBeInTheDocument();
    expect(
      screen.getByText(/nothing described so far points to a genuine ai opportunity/i),
    ).toBeInTheDocument();
  });

  it("shows the full assessment once the project is flagged as an AI product", async () => {
    const user = userEvent.setup();
    renderStage();

    await user.click(screen.getByRole("button", { name: "Set AI Product" }));

    expect(screen.getByText("AI is relevant here")).toBeInTheDocument();
    expect(screen.getByText("Evaluation")).toBeInTheDocument();
    expect(screen.getByText("Guardrails")).toBeInTheDocument();
    expect(screen.getByText("Data privacy")).toBeInTheDocument();
    expect(screen.getByText("Human review")).toBeInTheDocument();
  });
});
