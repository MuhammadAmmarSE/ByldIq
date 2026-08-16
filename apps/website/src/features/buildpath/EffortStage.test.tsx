import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { BuildPathStoreProvider } from "@/providers/BuildPathStoreProvider";

import { EffortStage } from "./EffortStage";

function renderStage() {
  return render(
    <BuildPathStoreProvider>
      <EffortStage />
    </BuildPathStoreProvider>,
  );
}

describe("EffortStage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows a ranged effort estimate, never a fabricated exact number", () => {
    renderStage();
    expect(screen.getByText("Low complexity")).toBeInTheDocument();
    expect(screen.getByText("Team size: 2–3 people")).toBeInTheDocument();
    expect(screen.getByText("Duration: 6–10 weeks")).toBeInTheDocument();
  });

  it("shows a recommended team and a risk assessment", () => {
    renderStage();
    expect(screen.getByText("Product Manager / Strategist")).toBeInTheDocument();
    expect(screen.getByText("Risks worth planning for")).toBeInTheDocument();
    expect(screen.getAllByText("Technical").length).toBeGreaterThan(0);
  });
});
