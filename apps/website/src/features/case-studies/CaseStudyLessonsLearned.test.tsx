import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CaseStudyLessonsLearned } from "./CaseStudyLessonsLearned";
import { CASE_STUDIES } from "./data/case-studies";

const caseStudy = CASE_STUDIES.find((candidate) => candidate.slug === "fieldnote-mvp");
if (!caseStudy) throw new Error("Missing fieldnote-mvp case study fixture");

describe("CaseStudyLessonsLearned", () => {
  it("renders every item from whatWorked, whatCouldImprove, and recommendations", () => {
    render(<CaseStudyLessonsLearned caseStudy={caseStudy} />);

    for (const item of caseStudy.whatWorked) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
    for (const item of caseStudy.whatCouldImprove) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
    for (const item of caseStudy.recommendations) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
  });

  it("gives the section a stable id for future in-page navigation", () => {
    const { container } = render(<CaseStudyLessonsLearned caseStudy={caseStudy} />);

    expect(container.querySelector("#lessons-learned")).toBeInTheDocument();
  });
});
