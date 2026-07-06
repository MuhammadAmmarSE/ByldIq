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

import { TECHNOLOGIES } from "./data/technologies";
import { TechnologyDetailHero } from "./TechnologyDetailHero";

const technology = TECHNOLOGIES.find((candidate) => candidate.slug === "next-js");
if (!technology) throw new Error("Missing next-js fixture");

describe("TechnologyDetailHero", () => {
  afterEach(() => {
    mockTrack.mockClear();
    mockOpen.mockClear();
  });

  it("renders the breadcrumb, headline, and who-benefits copy", () => {
    render(<TechnologyDetailHero technology={technology} categoryLabel="Frontend" />);

    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: technology.name })).toBeInTheDocument();
    expect(screen.getByText(technology.whoBenefits)).toBeInTheDocument();
    expect(screen.getByText("Frontend")).toBeInTheDocument();
  });

  it("tracks technology_viewed once on mount", () => {
    render(<TechnologyDetailHero technology={technology} />);
    expect(mockTrack).toHaveBeenCalledWith("technology_viewed", { slug: technology.slug });
  });

  it("links the primary CTA to BuildPath and tracks the click", async () => {
    const user = userEvent.setup();
    render(<TechnologyDetailHero technology={technology} />);

    const cta = screen.getByRole("link", { name: "Plan Your Roadmap" });
    expect(cta).toHaveAttribute("href", "/buildpath");

    await user.click(cta);
    expect(mockTrack).toHaveBeenCalledWith("technology_cta_selected", {
      slug: technology.slug,
      cta: "hero-primary",
    });
  });

  it("opens the AI companion from Talk to Byld", async () => {
    const user = userEvent.setup();
    render(<TechnologyDetailHero technology={technology} />);

    await user.click(screen.getByRole("button", { name: /talk to byld/i }));
    expect(mockOpen).toHaveBeenCalled();
    expect(mockTrack).toHaveBeenCalledWith("technology_cta_selected", {
      slug: technology.slug,
      cta: "ai",
    });
  });
});
