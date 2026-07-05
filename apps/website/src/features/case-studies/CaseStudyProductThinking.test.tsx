import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CaseStudyProductThinking } from "./CaseStudyProductThinking";
import { CASE_STUDIES } from "./data/case-studies";

const caseStudy = CASE_STUDIES.find((candidate) => candidate.slug === "fieldnote-mvp");
if (!caseStudy) throw new Error("Missing fieldnote-mvp case study fixture");

describe("CaseStudyProductThinking", () => {
  it("renders every decision's reasoning and trade-off", () => {
    render(<CaseStudyProductThinking caseStudy={caseStudy} />);

    for (const decision of caseStudy.productDecisions) {
      expect(screen.getByText(decision.decision)).toBeInTheDocument();
      expect(screen.getByText(decision.reasoning)).toBeInTheDocument();
      expect(screen.getByText(decision.tradeoff)).toBeInTheDocument();
    }
  });

  it("lists every rejected idea", () => {
    render(<CaseStudyProductThinking caseStudy={caseStudy} />);

    for (const idea of caseStudy.rejectedIdeas) {
      expect(screen.getByText(idea)).toBeInTheDocument();
    }
  });

  it("gives the section a stable id for future in-page navigation", () => {
    const { container } = render(<CaseStudyProductThinking caseStudy={caseStudy} />);

    expect(container.querySelector("#product-thinking")).toBeInTheDocument();
  });
});
