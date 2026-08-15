import type { ReactElement } from "react";
import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import {
  AiCompanionStoreProvider,
  useAiCompanionStore,
} from "@/providers/AiCompanionStoreProvider";

import { HomepageSection } from "./HomepageSection";

// `HomepageSection` attaches two independent `IntersectionObserver`s to the
// same DOM node (`useSectionAnalytics` and `useCurrentSectionSync`), so the
// mock must fire every registered instance's callback, not just the most
// recently constructed one.
function mockIntersectionObserver() {
  const triggers: ((isIntersecting: boolean) => void)[] = [];

  class MockObserver {
    constructor(callback: IntersectionObserverCallback) {
      triggers.push((isIntersecting) => {
        callback(
          [{ isIntersecting } as IntersectionObserverEntry],
          this as unknown as IntersectionObserver,
        );
      });
    }
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = () => [];
  }

  vi.stubGlobal("IntersectionObserver", MockObserver);
  return {
    trigger: (value: boolean) => {
      for (const fire of triggers) fire(value);
    },
  };
}

function renderWithAiCompanion(ui: ReactElement) {
  return render(<AiCompanionStoreProvider>{ui}</AiCompanionStoreProvider>);
}

describe("HomepageSection", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    mockTrack.mockClear();
  });

  it("renders a landmark section with the given id and content", () => {
    mockIntersectionObserver();
    renderWithAiCompanion(<HomepageSection id="arrival">Hello</HomepageSection>);

    const section = screen.getByText("Hello").closest("section");
    expect(section).toHaveAttribute("id", "arrival");
  });

  it("tracks section_viewed once the section scrolls into view, using analyticsId when given", () => {
    const { trigger } = mockIntersectionObserver();
    renderWithAiCompanion(
      <HomepageSection id="proof-engine" analyticsId="proof_engine">
        Content
      </HomepageSection>,
    );

    act(() => trigger(true));

    expect(mockTrack).toHaveBeenCalledWith("section_viewed", { section: "proof_engine" });
  });

  it("falls back to id for the analytics section name", () => {
    const { trigger } = mockIntersectionObserver();
    renderWithAiCompanion(<HomepageSection id="journey-selection">Content</HomepageSection>);

    act(() => trigger(true));

    expect(mockTrack).toHaveBeenCalledWith("section_viewed", { section: "journey-selection" });
  });

  it("syncs the AI Companion's currentSection when the section scrolls into view", () => {
    const { trigger } = mockIntersectionObserver();

    function Harness() {
      const currentSection = useAiCompanionStore((state) => state.currentSection);
      return (
        <>
          <HomepageSection id="technology-ecosystem">Content</HomepageSection>
          <p data-testid="current-section">{currentSection ?? "none"}</p>
        </>
      );
    }

    renderWithAiCompanion(<Harness />);
    expect(screen.getByTestId("current-section")).toHaveTextContent("none");

    act(() => trigger(true));
    expect(screen.getByTestId("current-section")).toHaveTextContent("technology-ecosystem");
  });
});
