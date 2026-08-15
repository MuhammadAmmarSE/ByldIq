import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CaseStudyBusinessContext } from "./CaseStudyBusinessContext";
import { CASE_STUDIES } from "./data/case-studies";

const caseStudy = CASE_STUDIES.find((candidate) => candidate.slug === "fieldnote-mvp");
if (!caseStudy) throw new Error("Missing fieldnote-mvp case study fixture");

describe("CaseStudyBusinessContext", () => {
  it("renders the business model, market, existing technology, and competitive pressure", () => {
    render(<CaseStudyBusinessContext caseStudy={caseStudy} />);

    expect(screen.getByText(caseStudy.businessContext.businessModel)).toBeInTheDocument();
    expect(screen.getByText(caseStudy.businessContext.market)).toBeInTheDocument();
    expect(screen.getByText(caseStudy.businessContext.existingTechnology)).toBeInTheDocument();
    expect(screen.getByText(caseStudy.businessContext.competitivePressure)).toBeInTheDocument();
  });

  it("gives the section a stable id for future in-page navigation", () => {
    const { container } = render(<CaseStudyBusinessContext caseStudy={caseStudy} />);

    expect(container.querySelector("#business-context")).toBeInTheDocument();
  });
});
