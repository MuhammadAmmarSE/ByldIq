import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { CaseStudyTechnologyDecisions } from "./CaseStudyTechnologyDecisions";
import { CASE_STUDIES } from "./data/case-studies";

const caseStudy = CASE_STUDIES.find((candidate) => candidate.slug === "fieldnote-mvp");
if (!caseStudy) throw new Error("Missing fieldnote-mvp case study fixture");

describe("CaseStudyTechnologyDecisions", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders every technology as a collapsed accordion trigger", () => {
    render(<CaseStudyTechnologyDecisions caseStudy={caseStudy} />);

    for (const technology of caseStudy.technologyDecisions) {
      expect(screen.getByRole("button", { name: technology.name })).toHaveAttribute(
        "aria-expanded",
        "false",
      );
    }
  });

  it("expands a technology to reveal why/trade-offs/alternatives/business impact/maintenance, and tracks it", async () => {
    const user = userEvent.setup();
    render(<CaseStudyTechnologyDecisions caseStudy={caseStudy} />);

    const [firstTechnology] = caseStudy.technologyDecisions;
    if (!firstTechnology) throw new Error("Case study has no technology decisions");

    await user.click(screen.getByRole("button", { name: firstTechnology.name }));

    expect(screen.getByText(firstTechnology.why)).toBeInTheDocument();
    expect(screen.getByText(firstTechnology.tradeoffs)).toBeInTheDocument();
    expect(screen.getByText(firstTechnology.businessImpact)).toBeInTheDocument();
    expect(screen.getByText(firstTechnology.maintenanceConsiderations)).toBeInTheDocument();
    for (const alternative of firstTechnology.alternatives) {
      expect(screen.getByText(alternative)).toBeInTheDocument();
    }

    expect(mockTrack).toHaveBeenCalledWith("case_study_technology_clicked", {
      slug: caseStudy.slug,
      technology: firstTechnology.id,
    });
  });

  it("gives the section a stable id for future in-page navigation", () => {
    const { container } = render(<CaseStudyTechnologyDecisions caseStudy={caseStudy} />);

    expect(container.querySelector("#technology-decisions")).toBeInTheDocument();
  });
});
