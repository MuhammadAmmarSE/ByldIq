import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack, mockOpen } = vi.hoisted(() => ({ mockTrack: vi.fn(), mockOpen: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

vi.mock("@/features/homepage/ai-companion", () => ({
  useAiCompanion: () => ({ open: mockOpen }),
}));

import { WorkExplorer } from "./WorkExplorer";

describe("WorkExplorer", () => {
  afterEach(() => {
    mockTrack.mockClear();
    mockOpen.mockClear();
  });

  it("renders the hero, featured work, and every case study by default", () => {
    render(<WorkExplorer />);

    expect(screen.getByRole("heading", { name: "Featured work" })).toBeInTheDocument();
    // Fieldnote is featured, so it renders in both the Featured and All sections.
    expect(screen.getAllByText("Fieldnote").length).toBe(2);
    // Atlas Logistics isn't featured, so it only renders in the All section.
    expect(screen.getByText("Atlas Logistics")).toBeInTheDocument();
  });

  it("filters by industry via the hero's quick filter and tracks it", async () => {
    const user = userEvent.setup();
    render(<WorkExplorer />);

    await user.click(screen.getByRole("button", { name: "Retail" }));

    expect(screen.getAllByText(/Nova Commerce/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/Atlas Logistics/i)).not.toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith("work_filter_changed", {
      facet: "industry",
      value: "retail",
    });
  });

  it("filters by search query and tracks it", async () => {
    const user = userEvent.setup();
    render(<WorkExplorer />);

    await user.type(screen.getByRole("searchbox", { name: /search case studies/i }), "Fieldnote");

    // "Featured work" always shows both featured items regardless of the
    // search query — only the "All engineering stories" grid below it
    // reacts to filtering, so scope this assertion there.
    const allSection = screen.getByRole("region", { name: "All engineering stories" });
    expect(within(allSection).getByText("Fieldnote")).toBeInTheDocument();
    expect(within(allSection).queryByText("Nova Commerce")).not.toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith(
      "work_search",
      expect.objectContaining({ query: expect.stringContaining("F") }),
    );
  });

  it("filters by AI involvement", async () => {
    const user = userEvent.setup();
    render(<WorkExplorer />);

    await user.click(screen.getByRole("combobox", { name: "Filter by AI involvement" }));
    await user.click(screen.getByRole("option", { name: "AI-powered only" }));

    expect(screen.getAllByText(/Northwind AI/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/Harborline Cloud/i)).not.toBeInTheDocument();
  });

  it("shows an educational empty state when nothing matches", async () => {
    const user = userEvent.setup();
    render(<WorkExplorer />);

    await user.type(
      screen.getByRole("searchbox", { name: /search case studies/i }),
      "nonexistent company xyz",
    );

    expect(screen.getByText(/No projects match/i)).toBeInTheDocument();
  });

  it("opens the AI companion from the hero's Ask Byld prompt", async () => {
    const user = userEvent.setup();
    render(<WorkExplorer />);

    await user.click(screen.getByRole("button", { name: /ask byld/i }));
    expect(mockOpen).toHaveBeenCalled();
  });

  it("preseeds the search box, filters, and hero copy from the initial* and headline props", () => {
    render(
      <WorkExplorer
        initialQuery="Fieldnote"
        initialIndustryFilter="field-services"
        headline="Field Services engineering stories."
        supportingCopy="Case studies from field services teams."
      />,
    );

    expect(screen.getByRole("searchbox", { name: /search case studies/i })).toHaveValue(
      "Fieldnote",
    );
    expect(screen.getByRole("button", { name: "Field Services" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(
      screen.getByRole("heading", { name: "Field Services engineering stories." }),
    ).toBeInTheDocument();
    expect(screen.getByText("Case studies from field services teams.")).toBeInTheDocument();
  });
});
