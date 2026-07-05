import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CaseStudyChallenges } from "./CaseStudyChallenges";
import { CASE_STUDIES } from "./data/case-studies";

const caseStudy = CASE_STUDIES.find((candidate) => candidate.slug === "fieldnote-mvp");
if (!caseStudy) throw new Error("Missing fieldnote-mvp case study fixture");

describe("CaseStudyChallenges", () => {
  it("renders every challenge's issue and resolution", () => {
    render(<CaseStudyChallenges caseStudy={caseStudy} />);

    for (const challenge of caseStudy.challenges) {
      expect(screen.getByText(challenge.issue)).toBeInTheDocument();
      expect(screen.getByText(challenge.resolution)).toBeInTheDocument();
    }
  });

  it("gives the section a stable id for future in-page navigation", () => {
    const { container } = render(<CaseStudyChallenges caseStudy={caseStudy} />);

    expect(container.querySelector("#challenges")).toBeInTheDocument();
  });
});
