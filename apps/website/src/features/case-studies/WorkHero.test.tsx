import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

const { mockOpen } = vi.hoisted(() => ({ mockOpen: vi.fn() }));

vi.mock("@/features/homepage/ai-companion", () => ({
  useAiCompanion: () => ({ open: mockOpen }),
}));

import { CASE_STUDIES } from "./data/case-studies";
import { WorkHero } from "./WorkHero";

const industries = [
  { slug: "logistics", label: "Logistics" },
  { slug: "retail", label: "Retail" },
];

function requireCaseStudy(slug: string) {
  const found = CASE_STUDIES.find((candidate) => candidate.slug === slug);
  if (!found) throw new Error(`Missing ${slug} case study fixture`);
  return found;
}

describe("WorkHero", () => {
  it("renders the search field and calls onQueryChange", async () => {
    const user = userEvent.setup();
    const onQueryChange = vi.fn();

    render(
      <WorkHero
        query=""
        onQueryChange={onQueryChange}
        industries={industries}
        industryFilter={null}
        onIndustryQuickFilter={vi.fn()}
      />,
    );

    await user.type(screen.getByRole("searchbox", { name: /search case studies/i }), "a");
    expect(onQueryChange).toHaveBeenCalled();
  });

  it("renders a quick filter button per industry and reports selection", async () => {
    const user = userEvent.setup();
    const onIndustryQuickFilter = vi.fn();

    render(
      <WorkHero
        query=""
        onQueryChange={vi.fn()}
        industries={industries}
        industryFilter={null}
        onIndustryQuickFilter={onIndustryQuickFilter}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Retail" }));
    expect(onIndustryQuickFilter).toHaveBeenCalledWith("retail");
  });

  it("opens the AI companion from the Ask Byld prompt", async () => {
    const user = userEvent.setup();

    render(
      <WorkHero
        query=""
        onQueryChange={vi.fn()}
        industries={industries}
        industryFilter={null}
        onIndustryQuickFilter={vi.fn()}
      />,
    );

    await user.click(screen.getByRole("button", { name: /ask byld/i }));
    expect(mockOpen).toHaveBeenCalled();
  });

  it("links to the featured case study when given one", () => {
    const featured = requireCaseStudy("fieldnote-mvp");

    render(
      <WorkHero
        query=""
        onQueryChange={vi.fn()}
        industries={industries}
        industryFilter={null}
        onIndustryQuickFilter={vi.fn()}
        featured={featured}
      />,
    );

    expect(screen.getByRole("link", { name: featured.headline })).toHaveAttribute(
      "href",
      `/work/${featured.slug}`,
    );
  });

  it("uses the default headline and supporting copy when none are given", () => {
    render(
      <WorkHero
        query=""
        onQueryChange={vi.fn()}
        industries={industries}
        industryFilter={null}
        onIndustryQuickFilter={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Engineering Stories, Not Portfolios." }),
    ).toBeInTheDocument();
  });

  it("overrides the headline and supporting copy when given, for facet-specific pages", () => {
    render(
      <WorkHero
        query=""
        onQueryChange={vi.fn()}
        industries={industries}
        industryFilter={null}
        onIndustryQuickFilter={vi.fn()}
        headline="Retail engineering stories."
        supportingCopy="Case studies from retail teams."
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Retail engineering stories." }),
    ).toBeInTheDocument();
    expect(screen.getByText("Case studies from retail teams.")).toBeInTheDocument();
  });
});
