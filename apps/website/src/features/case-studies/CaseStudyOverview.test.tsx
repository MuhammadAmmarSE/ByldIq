import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CaseStudyOverview } from "./CaseStudyOverview";
import { CASE_STUDIES } from "./data/case-studies";

const caseStudy = CASE_STUDIES.find((candidate) => candidate.slug === "fieldnote-mvp");
if (!caseStudy) throw new Error("Missing fieldnote-mvp case study fixture");

describe("CaseStudyOverview", () => {
  it("renders the executive summary and the business challenge narrative", () => {
    render(<CaseStudyOverview caseStudy={caseStudy} />);

    expect(screen.getByText(caseStudy.executiveSummary)).toBeInTheDocument();
    expect(screen.getByText(caseStudy.challenge)).toBeInTheDocument();
    expect(screen.getByText(caseStudy.whyItMattered)).toBeInTheDocument();
  });

  it("lists every constraint, risk, and success criterion", () => {
    render(<CaseStudyOverview caseStudy={caseStudy} />);

    for (const constraint of caseStudy.constraints) {
      expect(screen.getByText(constraint)).toBeInTheDocument();
    }
    for (const risk of caseStudy.risks) {
      expect(screen.getByText(risk)).toBeInTheDocument();
    }
    for (const criterion of caseStudy.successCriteria) {
      expect(screen.getByText(criterion)).toBeInTheDocument();
    }
  });

  it("gives each section a stable id for future in-page navigation", () => {
    const { container } = render(<CaseStudyOverview caseStudy={caseStudy} />);

    expect(container.querySelector("#executive-summary")).toBeInTheDocument();
    expect(container.querySelector("#business-challenge")).toBeInTheDocument();
  });
});
