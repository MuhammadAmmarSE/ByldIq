import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: vi.fn() }),
}));

import { BuildPathStoreProvider } from "@/providers/BuildPathStoreProvider";

import { IntegrationsSelector } from "./IntegrationsSelector";

function renderSelector() {
  return render(
    <BuildPathStoreProvider>
      <IntegrationsSelector />
    </BuildPathStoreProvider>,
  );
}

describe("IntegrationsSelector", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("toggles an integration on and off", async () => {
    const user = userEvent.setup();
    renderSelector();

    const authButton = screen.getByRole("button", { name: "Authentication" });
    expect(authButton).toHaveAttribute("aria-pressed", "false");

    await user.click(authButton);
    expect(authButton).toHaveAttribute("aria-pressed", "true");

    await user.click(authButton);
    expect(authButton).toHaveAttribute("aria-pressed", "false");
  });
});
