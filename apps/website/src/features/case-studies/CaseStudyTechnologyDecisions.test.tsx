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

const atlasCaseStudy = CASE_STUDIES.find(
  (candidate) => candidate.slug === "atlas-logistics-modernization",
);
if (!atlasCaseStudy) throw new Error("Missing atlas-logistics-modernization case study fixture");

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

  it("links to the real Technology Explorer for a technology that has one, and tracks the click", async () => {
    const user = userEvent.setup();
    render(<CaseStudyTechnologyDecisions caseStudy={caseStudy} />);

    await user.click(screen.getByRole("button", { name: "Next.js" }));

    const link = screen.getByRole("link", { name: /Next\.js in the Technology Explorer/i });
    expect(link).toHaveAttribute("href", "/technology/next-js");

    await user.click(link);
    expect(mockTrack).toHaveBeenCalledWith("case_study_technology_explorer_clicked", {
      slug: caseStudy.slug,
      technology: "next-js",
      technologySlug: "next-js",
    });
  });

  it("renders no Technology Explorer link for a technology that isn't in that platform's roster", async () => {
    const user = userEvent.setup();
    render(<CaseStudyTechnologyDecisions caseStudy={atlasCaseStudy} />);

    await user.click(screen.getByRole("button", { name: "Event-driven architecture" }));

    expect(screen.queryByText(/in the Technology Explorer/i)).not.toBeInTheDocument();
  });
});
