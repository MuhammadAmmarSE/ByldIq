import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CaseStudyDiscovery } from "./CaseStudyDiscovery";
import { CASE_STUDIES } from "./data/case-studies";

const caseStudy = CASE_STUDIES.find((candidate) => candidate.slug === "fieldnote-mvp");
if (!caseStudy) throw new Error("Missing fieldnote-mvp case study fixture");

describe("CaseStudyDiscovery", () => {
  it("renders every discovery activity's title and description", () => {
    render(<CaseStudyDiscovery caseStudy={caseStudy} />);

    for (const activity of caseStudy.discovery) {
      expect(screen.getByRole("heading", { name: activity.title })).toBeInTheDocument();
      expect(screen.getByText(activity.description)).toBeInTheDocument();
    }
  });

  it("gives the section a stable id for future in-page navigation", () => {
    const { container } = render(<CaseStudyDiscovery caseStudy={caseStudy} />);

    expect(container.querySelector("#discovery")).toBeInTheDocument();
  });
});
