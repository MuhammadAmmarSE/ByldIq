import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { ScrollDepthTracker } from "./ScrollDepthTracker";

function mockScroll({ scrollY, scrollHeight, innerHeight }: Record<string, number>) {
  Object.defineProperty(window, "scrollY", { value: scrollY, configurable: true });
  Object.defineProperty(document.documentElement, "scrollHeight", {
    value: scrollHeight,
    configurable: true,
  });
  Object.defineProperty(window, "innerHeight", { value: innerHeight, configurable: true });
  window.dispatchEvent(new Event("scroll"));
}

describe("ScrollDepthTracker", () => {
  it("renders nothing", () => {
    const { container } = render(<ScrollDepthTracker />);
    expect(container).toBeEmptyDOMElement();
  });

  it("forwards its page prop to useScrollDepth", () => {
    render(<ScrollDepthTracker page="work" />);

    mockScroll({ scrollY: 200, scrollHeight: 1000, innerHeight: 200 }); // 25%

    expect(mockTrack).toHaveBeenCalledWith("scroll_depth_reached", { depth: 25, page: "work" });
  });
});
