import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { HomepageSection } from "./HomepageSection";

function mockIntersectionObserver() {
  let trigger: (isIntersecting: boolean) => void = () => {};

  class MockObserver {
    constructor(callback: IntersectionObserverCallback) {
      trigger = (isIntersecting) => {
        callback(
          [{ isIntersecting } as IntersectionObserverEntry],
          this as unknown as IntersectionObserver,
        );
      };
    }
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = () => [];
  }

  vi.stubGlobal("IntersectionObserver", MockObserver);
  return { trigger: (value: boolean) => trigger(value) };
}

describe("HomepageSection", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    mockTrack.mockClear();
  });

  it("renders a landmark section with the given id and content", () => {
    mockIntersectionObserver();
    render(<HomepageSection id="arrival">Hello</HomepageSection>);

    const section = screen.getByText("Hello").closest("section");
    expect(section).toHaveAttribute("id", "arrival");
  });

  it("tracks section_viewed once the section scrolls into view, using analyticsId when given", () => {
    const { trigger } = mockIntersectionObserver();
    render(
      <HomepageSection id="proof-engine" analyticsId="proof_engine">
        Content
      </HomepageSection>,
    );

    act(() => trigger(true));

    expect(mockTrack).toHaveBeenCalledWith("section_viewed", { section: "proof_engine" });
  });

  it("falls back to id for the analytics section name", () => {
    const { trigger } = mockIntersectionObserver();
    render(<HomepageSection id="journey-selection">Content</HomepageSection>);

    act(() => trigger(true));

    expect(mockTrack).toHaveBeenCalledWith("section_viewed", { section: "journey-selection" });
  });
});
