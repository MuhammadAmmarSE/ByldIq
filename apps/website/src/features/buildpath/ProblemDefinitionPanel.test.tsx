import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: vi.fn() }),
}));

import { BuildPathStoreProvider, useBuildPathStore } from "@/providers/BuildPathStoreProvider";

import { ProblemDefinitionPanel } from "./ProblemDefinitionPanel";

function Seed({ children }: { children: ReactNode }) {
  const updateDiscovery = useBuildPathStore((state) => state.updateDiscovery);
  return (
    <>
      <button
        onClick={() =>
          updateDiscovery({
            accomplish: "A booking tool for clinics",
            problem: "Clinics lose bookings to phone tag",
            whoExperiencesIt: "Small physiotherapy clinics",
            whyNow: "Caseload is growing past what a paper diary can handle",
            successLooksLike: "Fewer missed appointments",
          })
        }
      >
        Seed discovery
      </button>
      {children}
    </>
  );
}

function renderPanel() {
  return render(
    <BuildPathStoreProvider>
      <Seed>
        <ProblemDefinitionPanel />
      </Seed>
    </BuildPathStoreProvider>,
  );
}

describe("ProblemDefinitionPanel", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows a prompt to answer Discovery first when there's nothing to draft from", () => {
    renderPanel();
    expect(
      screen.getByText(/answer a few questions in the conversation above/i),
    ).toBeInTheDocument();
  });

  it("drafts the problem statement from discovery answers, unconfirmed", async () => {
    const user = userEvent.setup();
    renderPanel();

    await user.click(screen.getByRole("button", { name: "Seed discovery" }));
    await user.click(screen.getByRole("button", { name: "Draft with Byld" }));

    expect(screen.getByLabelText("The problem, in plain terms")).toHaveValue(
      "Clinics lose bookings to phone tag",
    );
    expect(screen.getByText("Needs your review")).toBeInTheDocument();
  });

  it("requires an explicit confirmation, and un-confirms on edit", async () => {
    const user = userEvent.setup();
    renderPanel();

    await user.click(screen.getByRole("button", { name: "Seed discovery" }));
    await user.click(screen.getByRole("button", { name: "Draft with Byld" }));
    await user.click(screen.getByRole("button", { name: "This looks right" }));

    expect(screen.getByText("Confirmed")).toBeInTheDocument();

    await user.type(screen.getByLabelText("The problem, in plain terms"), " — updated");
    expect(screen.getByText("Needs your review")).toBeInTheDocument();
  });
});
