import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { useScrollDepth } from "./useScrollDepth";

function Harness({ page }: { page?: string } = {}) {
  useScrollDepth(page);
  return null;
}

function mockScroll({ scrollY, scrollHeight, innerHeight }: Record<string, number>) {
  Object.defineProperty(window, "scrollY", { value: scrollY, configurable: true });
  Object.defineProperty(document.documentElement, "scrollHeight", {
    value: scrollHeight,
    configurable: true,
  });
  Object.defineProperty(window, "innerHeight", { value: innerHeight, configurable: true });
  window.dispatchEvent(new Event("scroll"));
}

describe("useScrollDepth", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("fires scroll_depth_reached once per threshold crossed", () => {
    render(<Harness />);

    // 1000px document, 200px viewport -> 800px scrollable range.
    mockScroll({ scrollY: 200, scrollHeight: 1000, innerHeight: 200 }); // 25%
    mockScroll({ scrollY: 400, scrollHeight: 1000, innerHeight: 200 }); // 50%

    expect(mockTrack).toHaveBeenCalledWith("scroll_depth_reached", { depth: 25 });
    expect(mockTrack).toHaveBeenCalledWith("scroll_depth_reached", { depth: 50 });
    expect(mockTrack).toHaveBeenCalledTimes(2);
  });

  it("does not fire the same threshold twice", () => {
    render(<Harness />);

    mockScroll({ scrollY: 800, scrollHeight: 1000, innerHeight: 200 }); // 100%
    mockScroll({ scrollY: 800, scrollHeight: 1000, innerHeight: 200 }); // still 100%

    const hundredCalls = mockTrack.mock.calls.filter(([, payload]) => payload.depth === 100);
    expect(hundredCalls).toHaveLength(1);
  });

  it("includes the given page identifier so events from different pages are distinguishable", () => {
    render(<Harness page="work" />);

    mockScroll({ scrollY: 200, scrollHeight: 1000, innerHeight: 200 }); // 25%

    expect(mockTrack).toHaveBeenCalledWith("scroll_depth_reached", { depth: 25, page: "work" });
  });
});
