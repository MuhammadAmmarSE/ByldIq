import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: vi.fn() }),
}));

import { BuildPathStoreProvider } from "@/providers/BuildPathStoreProvider";

import { ArchitectureDiagram } from "./ArchitectureDiagram";

function renderDiagram() {
  return render(
    <BuildPathStoreProvider>
      <ArchitectureDiagram />
    </BuildPathStoreProvider>,
  );
}

describe("ArchitectureDiagram", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the baseline nodes for a project with no special signals", () => {
    renderDiagram();
    expect(screen.getByRole("button", { name: "Web App" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "API Layer" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Database" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Hosting Platform" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Monitoring & Observability" })).toBeInTheDocument();
  });

  it("selects the first node by default and shows its full explanation", () => {
    renderDiagram();
    expect(screen.getByRole("button", { name: "Web App" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("What")).toBeInTheDocument();
    expect(screen.getByText("Why")).toBeInTheDocument();
    expect(screen.getByText("Alternative")).toBeInTheDocument();
    expect(screen.getByText("Trade-off")).toBeInTheDocument();
    expect(screen.getByText("Cost")).toBeInTheDocument();
    expect(screen.getByText("Scaling")).toBeInTheDocument();
  });

  it("switches the detail panel when a different node is selected", async () => {
    const user = userEvent.setup();
    renderDiagram();

    await user.click(screen.getByRole("button", { name: "Database" }));

    expect(screen.getByRole("button", { name: "Database" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "Web App" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(
      screen.getByText(/most product data — accounts, records, permissions/i),
    ).toBeInTheDocument();
  });

  it("links to the Technology Explorer for nodes with a mapped technology", () => {
    renderDiagram();
    expect(screen.getByRole("link", { name: /technology explorer/i })).toHaveAttribute(
      "href",
      "/technology/next-js",
    );
  });
});
