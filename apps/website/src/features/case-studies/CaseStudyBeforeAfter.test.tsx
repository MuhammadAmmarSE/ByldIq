import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CaseStudyBeforeAfter } from "./CaseStudyBeforeAfter";
import { CASE_STUDIES } from "./data/case-studies";

function requireCaseStudy(slug: string) {
  const found = CASE_STUDIES.find((candidate) => candidate.slug === slug);
  if (!found) throw new Error(`Missing ${slug} case study fixture`);
  return found;
}

describe("CaseStudyBeforeAfter", () => {
  it("renders a real before/after pair parsed from a metric value", () => {
    const caseStudy = requireCaseStudy("harborline-developer-platform");
    render(<CaseStudyBeforeAfter caseStudy={caseStudy} />);

    expect(screen.getByText("Environment provisioning")).toBeInTheDocument();
    expect(screen.getByText("2 days")).toBeInTheDocument();
    expect(screen.getByText("12 min")).toBeInTheDocument();
  });

  it("renders nothing for a case study with no before/after metric, rather than fabricating one", () => {
    const caseStudy = requireCaseStudy("fieldnote-mvp");
    const { container } = render(<CaseStudyBeforeAfter caseStudy={caseStudy} />);

    expect(container).toBeEmptyDOMElement();
  });
});
