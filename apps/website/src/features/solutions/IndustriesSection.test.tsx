import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { INDUSTRIES } from "./data/industries";
import { IndustriesSection } from "./IndustriesSection";

describe("IndustriesSection", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders a card linking to every industry", () => {
    render(<IndustriesSection />);

    for (const industry of INDUSTRIES) {
      expect(screen.getByRole("link", { name: new RegExp(industry.label) })).toHaveAttribute(
        "href",
        `/solutions/industry/${industry.slug}`,
      );
    }
  });

  it("tracks a card click", async () => {
    const user = userEvent.setup();
    render(<IndustriesSection />);

    const [firstIndustry] = INDUSTRIES;
    if (!firstIndustry) throw new Error("Expected at least one industry fixture");

    await user.click(screen.getByRole("link", { name: new RegExp(firstIndustry.label) }));
    expect(mockTrack).toHaveBeenCalledWith("industry_card_clicked", { slug: firstIndustry.slug });
  });
});
