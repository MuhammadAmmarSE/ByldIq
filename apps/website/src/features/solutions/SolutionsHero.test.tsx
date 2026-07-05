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

import { SOLUTIONS_HERO_CONTENT } from "./data/hero-content";
import { SolutionsHero } from "./SolutionsHero";

function renderHero() {
  return render(
    <StoreProvider>
      <AiCompanionStoreProvider>
        <SolutionsHero />
      </AiCompanionStoreProvider>
    </StoreProvider>,
  );
}

describe("SolutionsHero", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    mockTrack.mockClear();
  });

  it("shows the default headline and a generic browse CTA with no journey selected", () => {
    renderHero();

    expect(screen.getByText(SOLUTIONS_HERO_CONTENT.default.headline)).toBeInTheDocument();
    const cta = screen.getByRole("link", { name: /browse solutions/i });
    expect(cta).toHaveAttribute("href", "#solution-selector");
  });

  it("shows journey-specific copy and links the primary CTA to the recommended solution", () => {
    function Harness() {
      const setJourney = useAppStore((state) => state.setJourney);
      useEffect(() => setJourney("enterprise"), [setJourney]);
      return <SolutionsHero />;
    }

    render(
      <StoreProvider>
        <AiCompanionStoreProvider>
          <Harness />
        </AiCompanionStoreProvider>
      </StoreProvider>,
    );

    expect(screen.getByText(SOLUTIONS_HERO_CONTENT.enterprise.headline)).toBeInTheDocument();
    const cta = screen.getByRole("link", { name: /explore enterprise/i });
    expect(cta).toHaveAttribute("href", "/solutions/enterprise");
  });

  it("opens the AI companion from the Talk to Byld button", async () => {
    const user = userEvent.setup();

    function Harness() {
      const isOpen = useAiCompanionStore((state) => state.isOpen);
      return (
        <>
          <SolutionsHero />
          <p data-testid="ai-open-state">{isOpen ? "open" : "closed"}</p>
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

    await user.click(screen.getByRole("button", { name: /talk to byld/i }));
    expect(screen.getByTestId("ai-open-state")).toHaveTextContent("open");
  });
});
