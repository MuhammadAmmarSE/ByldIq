import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: vi.fn() }),
}));

import { ToastProvider } from "@/components/Toast";
import { BuildPathStoreProvider, useBuildPathStore } from "@/providers/BuildPathStoreProvider";

import { SummaryStage } from "./SummaryStage";

function Harness() {
  const completedAt = useBuildPathStore((state) => state.completedAt);
  const updateDiscovery = useBuildPathStore((state) => state.updateDiscovery);
  const updateProblemStatement = useBuildPathStore((state) => state.updateProblemStatement);
  const addFeature = useBuildPathStore((state) => state.addFeature);
  return (
    <>
      <button
        onClick={() => {
          updateDiscovery({ accomplish: "A booking tool for clinics" });
          updateProblemStatement({ problem: "Clinics lose bookings to phone tag" });
          addFeature({
            id: "1",
            name: "Online booking calendar",
            description: "",
            forUser: "",
            priority: "must",
            complexity: "medium",
            dependencies: [],
            source: "user",
          });
        }}
      >
        Seed
      </button>
      <SummaryStage />
      <p data-testid="completed-at">{completedAt ?? "not completed"}</p>
    </>
  );
}

function renderStage() {
  return render(
    <BuildPathStoreProvider>
      <ToastProvider>
        <Harness />
      </ToastProvider>
    </BuildPathStoreProvider>,
  );
}

describe("SummaryStage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("marks the session completed as soon as the Final Plan is viewed", () => {
    renderStage();
    expect(screen.getByTestId("completed-at")).not.toHaveTextContent("not completed");
  });

  it("shows the generated vision, problem, and MVP features", async () => {
    const user = userEvent.setup();
    renderStage();

    await user.click(screen.getByRole("button", { name: "Seed" }));

    expect(screen.getByText("A booking tool for clinics")).toBeInTheDocument();
    expect(screen.getByText("Clinics lose bookings to phone tag")).toBeInTheDocument();
    expect(screen.getByText("Online booking calendar")).toBeInTheDocument();
  });

  it("links Export as PDF to the print view", () => {
    renderStage();
    expect(screen.getByRole("link", { name: /export as pdf/i })).toHaveAttribute(
      "href",
      "/buildpath/print",
    );
  });

  it("copies a plain-text summary to the clipboard", async () => {
    const user = userEvent.setup();
    const mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: mockWriteText },
      configurable: true,
    });

    renderStage();
    await user.click(screen.getByRole("button", { name: "Seed" }));
    await user.click(screen.getByRole("button", { name: /copy summary/i }));

    expect(mockWriteText).toHaveBeenCalledWith(
      expect.stringContaining("Vision: A booking tool for clinics"),
    );
    expect(await screen.findByText("Summary copied")).toBeInTheDocument();
  });

  it("shares a link pointing at the encoded plan", async () => {
    const user = userEvent.setup();
    const mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: mockWriteText },
      configurable: true,
    });

    renderStage();
    await user.click(screen.getByRole("button", { name: "Share" }));

    expect(mockWriteText).toHaveBeenCalledWith(expect.stringContaining("/buildpath/share/"));
  });
});
