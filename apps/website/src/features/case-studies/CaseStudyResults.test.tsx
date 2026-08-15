import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CaseStudyResults } from "./CaseStudyResults";
import { CASE_STUDIES } from "./data/case-studies";

const caseStudy = CASE_STUDIES.find((candidate) => candidate.slug === "fieldnote-mvp");
if (!caseStudy) throw new Error("Missing fieldnote-mvp case study fixture");

describe("CaseStudyResults", () => {
  it("renders the approach, outcome, and every metric", () => {
    const { container } = render(<CaseStudyResults caseStudy={caseStudy} />);

    expect(screen.getByText(caseStudy.approach)).toBeInTheDocument();
    expect(screen.getByText(caseStudy.outcome)).toBeInTheDocument();
    // Each metric renders through `AnimatedMetric` (Milestone 11), which for
    // a parseable value shows the real number only inside an `sr-only`
    // announcement (the visible digits are frozen mid-count-up in jsdom, no
    // real IntersectionObserver) — checking the container's full text
    // content covers both the counting and static-fallback render paths.
    for (const metric of caseStudy.metrics) {
      expect(container.textContent).toContain(metric.value);
      expect(container.textContent).toContain(metric.label);
    }
  });

  it("gives the section a stable id for future in-page navigation", () => {
    const { container } = render(<CaseStudyResults caseStudy={caseStudy} />);

    expect(container.querySelector("#results")).toBeInTheDocument();
  });
});
