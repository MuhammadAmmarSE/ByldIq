import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: vi.fn() }),
}));

import { BuildPathStoreProvider } from "@/providers/BuildPathStoreProvider";

import { TargetUsersPanel } from "./TargetUsersPanel";

function renderPanel() {
  return render(
    <BuildPathStoreProvider>
      <TargetUsersPanel />
    </BuildPathStoreProvider>,
  );
}

describe("TargetUsersPanel", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows an empty state with no user groups yet", () => {
    renderPanel();
    expect(screen.getByText(/no user groups yet/i)).toBeInTheDocument();
  });

  it("adds a user group and clears the form", async () => {
    const user = userEvent.setup();
    renderPanel();

    await user.type(screen.getByLabelText("Role or description"), "Front-desk staff");
    await user.type(screen.getByLabelText("What they need"), "Fast rebooking");
    await user.click(screen.getByRole("button", { name: "Add user group" }));

    expect(screen.getByText("Front-desk staff")).toBeInTheDocument();
    expect(screen.getByText(/needs: fast rebooking/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Role or description")).toHaveValue("");
  });

  it("removes a user group", async () => {
    const user = userEvent.setup();
    renderPanel();

    await user.type(screen.getByLabelText("Role or description"), "Front-desk staff");
    await user.click(screen.getByRole("button", { name: "Add user group" }));
    await user.click(screen.getByRole("button", { name: "Remove Front-desk staff" }));

    expect(screen.queryByText("Front-desk staff")).not.toBeInTheDocument();
  });

  it("disables Add until a role is entered", () => {
    renderPanel();
    expect(screen.getByRole("button", { name: "Add user group" })).toBeDisabled();
  });
});
