import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: vi.fn() }),
}));

import { CASE_STUDIES } from "@/features/case-studies";

import { KNOWLEDGE_ARTICLES } from "./data/articles";
import { KnowledgeRelatedCaseStudies } from "./KnowledgeRelatedCaseStudies";

const validatingAnMvp = KNOWLEDGE_ARTICLES.find(
  (candidate) => candidate.slug === "validating-an-mvp",
);
if (!validatingAnMvp) throw new Error("Missing validating-an-mvp fixture");

const accessibilityChecklist = KNOWLEDGE_ARTICLES.find(
  (candidate) => candidate.slug === "accessibility-checklist-for-product-teams",
);
if (!accessibilityChecklist) throw new Error("Missing accessibility-checklist fixture");

describe("KnowledgeRelatedCaseStudies", () => {
  it("renders a card for every related case study", () => {
    render(<KnowledgeRelatedCaseStudies article={validatingAnMvp} />);

    expect(screen.getByRole("heading", { name: "Seen in the field" })).toBeInTheDocument();
    for (const slug of validatingAnMvp.relatedCaseStudySlugs) {
      const caseStudy = CASE_STUDIES.find((candidate) => candidate.slug === slug);
      if (!caseStudy) throw new Error(`Missing ${slug} case study fixture`);
      expect(screen.getByRole("link", { name: caseStudy.headline })).toHaveAttribute(
        "href",
        `/work/${caseStudy.slug}`,
      );
    }
  });

  it("renders nothing when there are no related case studies", () => {
    const { container } = render(<KnowledgeRelatedCaseStudies article={accessibilityChecklist} />);
    expect(container).toBeEmptyDOMElement();
  });
});
