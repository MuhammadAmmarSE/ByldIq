import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { CASE_STUDIES } from "@/features/homepage/proof-engine";

import { SOLUTIONS } from "./data/solutions";
import { RelatedCaseStudies } from "./RelatedCaseStudies";

function requireSolution(slug: string) {
  const found = SOLUTIONS.find((candidate) => candidate.slug === slug);
  if (!found) throw new Error(`Missing ${slug} solution fixture`);
  return found;
}

function requireCaseStudy(slug: string) {
  const found = CASE_STUDIES.find((candidate) => candidate.slug === slug);
  if (!found) throw new Error(`Missing ${slug} case study fixture`);
  return found;
}

const solution = requireSolution("startup");

describe("RelatedCaseStudies", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders every related case study as a link to its dedicated page", () => {
    render(<RelatedCaseStudies solution={solution} />);

    for (const slug of solution.relatedCaseStudySlugs) {
      const caseStudy = requireCaseStudy(slug);
      expect(screen.getByRole("link", { name: caseStudy.headline })).toHaveAttribute(
        "href",
        `/case-studies/${slug}`,
      );
    }
  });

  it("tracks clicking a related case study", async () => {
    const user = userEvent.setup();
    render(<RelatedCaseStudies solution={solution} />);

    const [firstSlug] = solution.relatedCaseStudySlugs;
    if (!firstSlug) throw new Error("Solution has no related case studies");
    const caseStudy = requireCaseStudy(firstSlug);

    await user.click(screen.getByRole("link", { name: caseStudy.headline }));

    expect(mockTrack).toHaveBeenCalledWith("solution_case_study_clicked", {
      slug: solution.slug,
      caseStudySlug: firstSlug,
    });
  });
});
