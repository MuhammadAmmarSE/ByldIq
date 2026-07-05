import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { SOLUTIONS } from "@/features/solutions";

import { CaseStudyRelatedSolutions } from "./CaseStudyRelatedSolutions";
import { CASE_STUDIES } from "./data/case-studies";

const caseStudy = CASE_STUDIES.find((candidate) => candidate.slug === "fieldnote-mvp");
if (!caseStudy) throw new Error("Missing fieldnote-mvp case study fixture");

describe("CaseStudyRelatedSolutions", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders a card for every related solution", () => {
    render(<CaseStudyRelatedSolutions caseStudy={caseStudy} />);

    for (const slug of caseStudy.relatedSolutionSlugs) {
      const solution = SOLUTIONS.find((candidate) => candidate.slug === slug);
      if (!solution) throw new Error(`Missing ${slug} solution fixture`);
      expect(screen.getByRole("link", { name: new RegExp(solution.navLabel) })).toBeInTheDocument();
    }
  });

  it("tracks case_study_solution_clicked when a related solution is selected", async () => {
    const user = userEvent.setup();
    render(<CaseStudyRelatedSolutions caseStudy={caseStudy} />);

    const [firstSlug] = caseStudy.relatedSolutionSlugs;
    if (!firstSlug) throw new Error("Case study has no related solutions");
    const solution = SOLUTIONS.find((candidate) => candidate.slug === firstSlug);
    if (!solution) throw new Error(`Missing ${firstSlug} solution fixture`);

    await user.click(screen.getByRole("link", { name: new RegExp(solution.navLabel) }));

    expect(mockTrack).toHaveBeenCalledWith("case_study_solution_clicked", {
      slug: caseStudy.slug,
      solutionSlug: firstSlug,
    });
  });

  it("gives the section a stable id for future in-page navigation", () => {
    const { container } = render(<CaseStudyRelatedSolutions caseStudy={caseStudy} />);

    expect(container.querySelector("#related-solutions")).toBeInTheDocument();
  });
});
