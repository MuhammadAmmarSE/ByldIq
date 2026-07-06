import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack, mockOpen } = vi.hoisted(() => ({ mockTrack: vi.fn(), mockOpen: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

vi.mock("@/features/homepage/ai-companion", () => ({
  useAiCompanion: () => ({ open: mockOpen }),
}));

import { TechnologyExplorer } from "./TechnologyExplorer";

describe("TechnologyExplorer", () => {
  afterEach(() => {
    mockTrack.mockClear();
    mockOpen.mockClear();
  });

  it("renders the hero and every technology by default", () => {
    render(<TechnologyExplorer />);

    expect(screen.getByRole("heading", { name: "All technologies" })).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
    expect(screen.getByText("Kubernetes")).toBeInTheDocument();
  });

  it("filters by category via the hero's quick filter and tracks it", async () => {
    const user = userEvent.setup();
    render(<TechnologyExplorer />);

    await user.click(screen.getByRole("button", { name: "Databases" }));

    expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
    expect(screen.getByText("MongoDB")).toBeInTheDocument();
    expect(screen.queryByText("Next.js")).not.toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith("technology_category_selected", {
      category: "databases",
    });
  });

  it("filters by search query and tracks it", async () => {
    const user = userEvent.setup();
    render(<TechnologyExplorer />);

    await user.type(screen.getByRole("searchbox", { name: /search technologies/i }), "Kubernetes");

    expect(screen.getByText("Kubernetes")).toBeInTheDocument();
    expect(screen.queryByText("Next.js")).not.toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith(
      "technology_search",
      expect.objectContaining({ query: expect.stringContaining("K") }),
    );
  });

  it("shows an educational empty state when nothing matches", async () => {
    const user = userEvent.setup();
    render(<TechnologyExplorer />);

    await user.type(
      screen.getByRole("searchbox", { name: /search technologies/i }),
      "nonexistent technology xyz",
    );

    expect(screen.getByText(/No technologies match/i)).toBeInTheDocument();
  });

  it("opens the AI companion from the hero's Ask Byld prompt", async () => {
    const user = userEvent.setup();
    render(<TechnologyExplorer />);

    await user.click(screen.getByRole("button", { name: /ask byld/i }));
    expect(mockOpen).toHaveBeenCalled();
  });

  it("tracks card clicks", async () => {
    const user = userEvent.setup();
    render(<TechnologyExplorer />);

    await user.click(screen.getByRole("link", { name: "Next.js" }));
    expect(mockTrack).toHaveBeenCalledWith("technology_card_clicked", { slug: "next-js" });
  });

  it("preseeds the search box, filters, and hero copy from the initial* and headline props", () => {
    render(
      <TechnologyExplorer
        initialQuery="Postgres"
        initialCategoryFilter="databases"
        headline="Database technology decisions."
        supportingCopy="Technologies for storing and querying data."
      />,
    );

    expect(screen.getByRole("searchbox", { name: /search technologies/i })).toHaveValue("Postgres");
    expect(screen.getByRole("button", { name: "Databases" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(
      screen.getByRole("heading", { name: "Database technology decisions." }),
    ).toBeInTheDocument();
    expect(screen.getByText("Technologies for storing and querying data.")).toBeInTheDocument();
  });
});
