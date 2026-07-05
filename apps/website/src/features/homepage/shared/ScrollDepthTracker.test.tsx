import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { ScrollDepthTracker } from "./ScrollDepthTracker";

describe("ScrollDepthTracker", () => {
  it("renders nothing", () => {
    const { container } = render(<ScrollDepthTracker />);
    expect(container).toBeEmptyDOMElement();
  });
});
