import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CaseStudyResults } from "./CaseStudyResults";
import { CASE_STUDIES } from "./data/case-studies";

const caseStudy = CASE_STUDIES.find((candidate) => candidate.slug === "fieldnote-mvp");
if (!caseStudy) throw new Error("Missing fieldnote-mvp case study fixture");

describe("CaseStudyResults", () => {
  it("renders the approach, outcome, and every metric", () => {
    render(<CaseStudyResults caseStudy={caseStudy} />);

    expect(screen.getByText(caseStudy.approach)).toBeInTheDocument();
    expect(screen.getByText(caseStudy.outcome)).toBeInTheDocument();
    for (const metric of caseStudy.metrics) {
      expect(screen.getByText(metric.value)).toBeInTheDocument();
      expect(screen.getByText(metric.label)).toBeInTheDocument();
    }
  });

  it("gives the section a stable id for future in-page navigation", () => {
    const { container } = render(<CaseStudyResults caseStudy={caseStudy} />);

    expect(container.querySelector("#results")).toBeInTheDocument();
  });
});
