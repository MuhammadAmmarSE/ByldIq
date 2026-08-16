import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it } from "vitest";

import { BuildPathStoreProvider, useBuildPathStore } from "@/providers/BuildPathStoreProvider";

import { ProductDefinitionStage } from "./ProductDefinitionStage";

function Seed({ children }: { children: ReactNode }) {
  const updateDiscovery = useBuildPathStore((state) => state.updateDiscovery);
  const updateProblemStatement = useBuildPathStore((state) => state.updateProblemStatement);
  const addTargetUserGroup = useBuildPathStore((state) => state.addTargetUserGroup);
  return (
    <>
      <button
        onClick={() => {
          updateDiscovery({ accomplish: "A booking tool for clinics" });
          updateProblemStatement({ problem: "Clinics lose bookings to phone tag" });
          addTargetUserGroup({
            id: "1",
            type: "primary",
            role: "Front-desk staff",
            needs: "",
            painPoints: "",
            goals: "",
          });
        }}
      >
        Seed
      </button>
      {children}
    </>
  );
}

function renderStage() {
  return render(
    <BuildPathStoreProvider>
      <Seed>
        <ProductDefinitionStage />
      </Seed>
    </BuildPathStoreProvider>,
  );
}

describe("ProductDefinitionStage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows honest empty states before anything is captured", () => {
    renderStage();
    expect(screen.getAllByText(/head back to discovery/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/you'll add features in the next step/i)).toBeInTheDocument();
  });

  it("reflects Discovery, Problem Definition, and Target Users without re-asking", async () => {
    const user = userEvent.setup();
    renderStage();

    await user.click(screen.getByRole("button", { name: "Seed" }));

    expect(screen.getByText("A booking tool for clinics")).toBeInTheDocument();
    expect(screen.getByText("Clinics lose bookings to phone tag")).toBeInTheDocument();
    expect(screen.getByText("Front-desk staff")).toBeInTheDocument();
  });

  it("toggles a platform selection", async () => {
    const user = userEvent.setup();
    renderStage();

    const webButton = screen.getByRole("button", { name: "Web" });
    expect(webButton).toHaveAttribute("aria-pressed", "false");

    await user.click(webButton);
    expect(webButton).toHaveAttribute("aria-pressed", "true");
  });

  it("captures constraints as free text", async () => {
    const user = userEvent.setup();
    renderStage();

    await user.type(screen.getByLabelText("Constraints"), "Must integrate with existing EHR");
    expect(screen.getByLabelText("Constraints")).toHaveValue("Must integrate with existing EHR");
  });
});
