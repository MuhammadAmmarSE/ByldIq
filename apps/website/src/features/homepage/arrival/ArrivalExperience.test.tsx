import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack, mockUseReducedMotion } = vi.hoisted(() => ({
  mockTrack: vi.fn(),
  mockUseReducedMotion: vi.fn(),
}));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

vi.mock("@/hooks/useReducedMotion", () => ({
  useReducedMotion: mockUseReducedMotion,
}));

import { StoreProvider } from "@/providers/StoreProvider";

import { ArrivalExperience } from "./ArrivalExperience";

function renderArrival(props?: { initialHasSeenIntro?: boolean }) {
  return render(
    <StoreProvider>
      <ArrivalExperience {...props} />
    </StoreProvider>,
  );
}

describe("ArrivalExperience", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    mockTrack.mockClear();
    document.cookie.split(";").forEach((cookie) => {
      const name = cookie.split("=")[0]?.trim();
      if (name) document.cookie = `${name}=; path=/; max-age=0`;
    });
  });

  it("renders the overlay with an accessible skip control for a first-time visitor", () => {
    mockUseReducedMotion.mockReturnValue(false);
    renderArrival({ initialHasSeenIntro: false });

    expect(screen.getByRole("button", { name: /skip intro/i })).toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith(
      "intro_started",
      expect.objectContaining({ reducedMotion: false }),
    );
  });

  it("renders nothing for a returning visitor (initialHasSeenIntro)", () => {
    mockUseReducedMotion.mockReturnValue(false);
    renderArrival({ initialHasSeenIntro: true });

    expect(screen.queryByRole("button", { name: /skip intro/i })).not.toBeInTheDocument();
    expect(mockTrack).not.toHaveBeenCalledWith("intro_started", expect.anything());
  });

  it("renders nothing under prefers-reduced-motion", () => {
    mockUseReducedMotion.mockReturnValue(true);
    renderArrival({ initialHasSeenIntro: false });

    expect(screen.queryByRole("button", { name: /skip intro/i })).not.toBeInTheDocument();
  });

  it("dismisses the overlay, tracks the skip, and persists intro-seen on skip click", async () => {
    mockUseReducedMotion.mockReturnValue(false);
    const user = userEvent.setup();
    renderArrival({ initialHasSeenIntro: false });

    await user.click(screen.getByRole("button", { name: /skip intro/i }));

    expect(mockTrack).toHaveBeenCalledWith(
      "intro_skipped",
      expect.objectContaining({ stageAtSkip: "initial" }),
    );
    expect(mockTrack).toHaveBeenCalledWith(
      "intro_time_to_interaction",
      expect.objectContaining({ reason: "skipped" }),
    );
    expect(screen.queryByRole("button", { name: /skip intro/i })).not.toBeInTheDocument();
    expect(document.cookie).toContain("byld_intro_seen=1");
  });
});
