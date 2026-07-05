import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { CaseStudyEngineeringProcess } from "./CaseStudyEngineeringProcess";
import { CASE_STUDIES } from "./data/case-studies";

const caseStudy = CASE_STUDIES.find((candidate) => candidate.slug === "fieldnote-mvp");
if (!caseStudy) throw new Error("Missing fieldnote-mvp case study fixture");

describe("CaseStudyEngineeringProcess", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders every stage as a collapsed, numbered accordion trigger", () => {
    render(<CaseStudyEngineeringProcess caseStudy={caseStudy} />);

    caseStudy.engineeringProcess.forEach((stage, index) => {
      const trigger = screen.getByRole("button", {
        name: new RegExp(`${String(index + 1).padStart(2, "0")}\\s*${stage.label}`),
      });
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });
  });

  it("expands a stage to reveal its description, and tracks it", async () => {
    const user = userEvent.setup();
    render(<CaseStudyEngineeringProcess caseStudy={caseStudy} />);

    const [firstStage] = caseStudy.engineeringProcess;
    if (!firstStage) throw new Error("Case study has no engineering process stages");

    await user.click(screen.getByRole("button", { name: new RegExp(firstStage.label) }));

    expect(screen.getByText(firstStage.description)).toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith("case_study_engineering_stage_selected", {
      slug: caseStudy.slug,
      stage: firstStage.id,
    });
  });

  it("gives the section a stable id for future in-page navigation", () => {
    const { container } = render(<CaseStudyEngineeringProcess caseStudy={caseStudy} />);

    expect(container.querySelector("#engineering-process")).toBeInTheDocument();
  });
});
