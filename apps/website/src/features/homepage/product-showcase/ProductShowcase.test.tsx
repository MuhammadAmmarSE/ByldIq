import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { ProductShowcase } from "./ProductShowcase";

describe("ProductShowcase", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders a tab per pod and shows the first pod by default", () => {
    render(<ProductShowcase />);

    expect(screen.getAllByRole("tab")).toHaveLength(7);
    expect(screen.getByRole("tab", { name: "AI Workspace" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(mockTrack).toHaveBeenCalledWith("showcase_pod_viewed", { pod: "ai-workspace" });
  });

  it("switches pods on click and tracks the view", async () => {
    const user = userEvent.setup();
    render(<ProductShowcase />);

    await user.click(screen.getByRole("tab", { name: "Mobile Product" }));

    expect(mockTrack).toHaveBeenCalledWith("showcase_pod_viewed", { pod: "mobile" });
  });
});
