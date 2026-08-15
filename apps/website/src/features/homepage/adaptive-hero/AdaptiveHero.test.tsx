import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEffect } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import {
  AiCompanionStoreProvider,
  useAiCompanionStore,
} from "@/providers/AiCompanionStoreProvider";
import { StoreProvider, useAppStore } from "@/providers/StoreProvider";

import { AdaptiveHero } from "./AdaptiveHero";
import { HERO_CONTENT } from "./data/hero-content";

function renderHero() {
  return render(
    <StoreProvider>
      <AiCompanionStoreProvider>
        <AdaptiveHero />
      </AiCompanionStoreProvider>
    </StoreProvider>,
  );
}

describe("AdaptiveHero", () => {
  beforeEach(() => {
    // The persisted app store (Phase 0) writes journey selection to
    // localStorage, and StoreProvider rehydrates from it on mount — clear it
    // so one test's journey selection can't leak into the next.
    localStorage.clear();
  });

  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders the default (generic) content when no journey is selected", () => {
    renderHero();
    expect(screen.getByText(HERO_CONTENT.default.headline)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: HERO_CONTENT.default.primaryCta.label }),
    ).toBeInTheDocument();
  });

  it("swaps to journey-specific content once a journey is selected", () => {
    function Harness() {
      const setJourney = useAppStore((state) => state.setJourney);
      useEffect(() => setJourney("commerce"), [setJourney]);
      return <AdaptiveHero />;
    }

    render(
      <StoreProvider>
        <AiCompanionStoreProvider>
          <Harness />
        </AiCompanionStoreProvider>
      </StoreProvider>,
    );

    expect(screen.getByText(HERO_CONTENT.commerce.headline)).toBeInTheDocument();
    expect(screen.getByText(HERO_CONTENT.commerce.supportingCopy)).toBeInTheDocument();
  });

  it("tracks hero_cta_clicked with the current journey when a CTA is clicked", async () => {
    const user = userEvent.setup();
    renderHero();

    await user.click(screen.getByRole("link", { name: HERO_CONTENT.default.primaryCta.label }));

    expect(mockTrack).toHaveBeenCalledWith("hero_cta_clicked", {
      journey: null,
      cta: "primary",
      label: HERO_CONTENT.default.primaryCta.label,
    });
  });

  it("records the CTA in the AI Companion's ctaHistory when clicked", async () => {
    const user = userEvent.setup();

    function Harness() {
      const ctaHistory = useAiCompanionStore((state) => state.ctaHistory);
      return (
        <>
          <AdaptiveHero />
          <p data-testid="cta-history">{ctaHistory.join(", ")}</p>
        </>
      );
    }

    render(
      <StoreProvider>
        <AiCompanionStoreProvider>
          <Harness />
        </AiCompanionStoreProvider>
      </StoreProvider>,
    );

    await user.click(screen.getByRole("link", { name: HERO_CONTENT.default.primaryCta.label }));

    expect(screen.getByTestId("cta-history")).toHaveTextContent(
      HERO_CONTENT.default.primaryCta.label,
    );
  });
});
