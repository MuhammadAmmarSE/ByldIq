import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { CaseStudyFaqSection } from "./CaseStudyFaqSection";
import { CASE_STUDIES } from "./data/case-studies";

const caseStudy = CASE_STUDIES.find((candidate) => candidate.slug === "fieldnote-mvp");
if (!caseStudy) throw new Error("Missing fieldnote-mvp case study fixture");

describe("CaseStudyFaqSection", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders every question as a collapsed accordion trigger", () => {
    render(<CaseStudyFaqSection caseStudy={caseStudy} />);

    for (const faq of caseStudy.faqs) {
      expect(screen.getByRole("button", { name: faq.question })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    }
  });

  it("expands a question to reveal its answer, and tracks it", async () => {
    const user = userEvent.setup();
    render(<CaseStudyFaqSection caseStudy={caseStudy} />);

    const [firstFaq] = caseStudy.faqs;
    if (!firstFaq) throw new Error("Case study has no FAQs");

    await user.click(screen.getByRole("button", { name: firstFaq.question }));

    expect(screen.getByText(firstFaq.answer)).toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith("case_study_faq_expanded", {
      slug: caseStudy.slug,
      question: firstFaq.question,
    });
  });

  it("gives the section a stable id for future in-page navigation", () => {
    const { container } = render(<CaseStudyFaqSection caseStudy={caseStudy} />);

    expect(container.querySelector("#faq")).toBeInTheDocument();
  });
});
