import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEffect } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { StoreProvider, useAppStore } from "@/providers/StoreProvider";

import { JourneySelector } from "./JourneySelector";

function renderSelector() {
  return render(
    <StoreProvider>
      <JourneySelector />
    </StoreProvider>,
  );
}

describe("JourneySelector", () => {
  beforeEach(() => {
    // The persisted app store (Phase 0) writes journey selection to
    // localStorage, and StoreProvider rehydrates from it on mount — clear it
    // so one test's journey selection can't leak into the next.
    localStorage.clear();
  });

  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders all five journeys as a radio group with no selection by default", () => {
    renderSelector();

    const group = screen.getByRole("radiogroup", { name: /choose the journey/i });
    expect(group).toBeInTheDocument();

    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(5);
    expect(radios.every((radio) => radio.getAttribute("aria-checked") === "false")).toBe(true);
  });

  it("selects a journey on click, tracks it, and shows a reset control", async () => {
    const user = userEvent.setup();
    renderSelector();

    await user.click(screen.getByRole("radio", { name: /startup/i }));

    expect(screen.getByRole("radio", { name: /startup/i })).toHaveAttribute("aria-checked", "true");
    expect(mockTrack).toHaveBeenCalledWith("journey_selected", {
      journey: "startup",
      previousJourney: null,
    });
    expect(screen.getByRole("button", { name: /change journey/i })).toBeInTheDocument();
  });

  it("moves focus between cards with arrow keys once one is selected (Radix roving focus)", async () => {
    const user = userEvent.setup();
    renderSelector();

    await user.click(screen.getByRole("radio", { name: /startup/i }));
    expect(screen.getByRole("radio", { name: /startup/i })).toHaveAttribute("aria-checked", "true");

    await user.keyboard("[ArrowRight]");
    expect(screen.getByRole("radio", { name: /enterprise/i })).toHaveFocus();
  });

  it("resets the journey back to null and tracks the reset", async () => {
    const user = userEvent.setup();
    renderSelector();

    await user.click(screen.getByRole("radio", { name: /commerce/i }));
    await user.click(screen.getByRole("button", { name: /change journey/i }));

    expect(mockTrack).toHaveBeenCalledWith("journey_reset", { previousJourney: "commerce" });
    expect(screen.queryByRole("button", { name: /change journey/i })).not.toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /commerce/i })).toHaveAttribute(
      "aria-checked",
      "false",
    );
  });

  it("reflects a journey already set in the store (e.g. restored from persistence)", () => {
    function Harness() {
      const setJourney = useAppStore((state) => state.setJourney);
      useEffect(() => setJourney("platform"), [setJourney]);
      return <JourneySelector />;
    }

    render(
      <StoreProvider>
        <Harness />
      </StoreProvider>,
    );

    expect(screen.getByRole("radio", { name: /platform/i })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });
});
