import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: vi.fn() }),
}));

import { CASE_STUDIES } from "@/features/case-studies";

import { TECHNOLOGIES } from "./data/technologies";
import { TechnologyRelatedCaseStudies } from "./TechnologyRelatedCaseStudies";

const nextJs = TECHNOLOGIES.find((candidate) => candidate.slug === "next-js");
if (!nextJs) throw new Error("Missing next-js fixture");

const remix = TECHNOLOGIES.find((candidate) => candidate.slug === "remix");
if (!remix) throw new Error("Missing remix fixture");

describe("TechnologyRelatedCaseStudies", () => {
  it("renders a card for every related case study", () => {
    render(<TechnologyRelatedCaseStudies technology={nextJs} />);

    expect(screen.getByRole("heading", { name: "Seen in the field" })).toBeInTheDocument();
    for (const slug of nextJs.relatedCaseStudySlugs) {
      const caseStudy = CASE_STUDIES.find((candidate) => candidate.slug === slug);
      if (!caseStudy) throw new Error(`Missing ${slug} case study fixture`);
      expect(screen.getByRole("link", { name: caseStudy.headline })).toHaveAttribute(
        "href",
        `/work/${caseStudy.slug}`,
      );
    }
  });

  it("renders nothing when there are no related case studies", () => {
    const { container } = render(<TechnologyRelatedCaseStudies technology={remix} />);
    expect(container).toBeEmptyDOMElement();
  });
});
