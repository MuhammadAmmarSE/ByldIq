import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { TECHNOLOGIES } from "@/features/technology";

import { TechnologyEcosystem } from "./TechnologyEcosystem";

describe("TechnologyEcosystem", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders every technology by default", () => {
    render(<TechnologyEcosystem />);

    for (const technology of TECHNOLOGIES) {
      expect(screen.getAllByText(technology.name).length).toBeGreaterThan(0);
    }
  });

  it("filters by category and tracks the change", async () => {
    const user = userEvent.setup();
    render(<TechnologyEcosystem />);

    await user.click(screen.getByRole("button", { name: "Commerce" }));

    expect(screen.getAllByText("Shopify Plus").length).toBeGreaterThan(0);
    expect(screen.queryByText("React Native")).not.toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith("technology_ecosystem_category_filtered", {
      category: "commerce",
    });
  });

  it("clears the filter when 'All' is clicked again", async () => {
    const user = userEvent.setup();
    render(<TechnologyEcosystem />);

    await user.click(screen.getByRole("button", { name: "Commerce" }));
    await user.click(screen.getByRole("button", { name: "All" }));

    expect(screen.getAllByText("React Native").length).toBeGreaterThan(0);
    expect(mockTrack).toHaveBeenCalledWith("technology_ecosystem_category_filtered", {
      category: null,
    });
  });

  it("tracks card selection", async () => {
    const user = userEvent.setup();
    render(<TechnologyEcosystem />);

    const [firstTechnology] = TECHNOLOGIES;
    if (!firstTechnology) throw new Error("Expected at least one technology fixture");

    await user.click(screen.getByRole("link", { name: firstTechnology.name }));
    expect(mockTrack).toHaveBeenCalledWith("technology_ecosystem_card_clicked", {
      slug: firstTechnology.slug,
    });
  });
});
