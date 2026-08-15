import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CaseStudyFutureRoadmap } from "./CaseStudyFutureRoadmap";
import { CASE_STUDIES } from "./data/case-studies";

const caseStudy = CASE_STUDIES.find((candidate) => candidate.slug === "fieldnote-mvp");
if (!caseStudy) throw new Error("Missing fieldnote-mvp case study fixture");

describe("CaseStudyFutureRoadmap", () => {
  it("renders every roadmap item with a label distinguishing client plans from Byld IQ recommendations", () => {
    render(<CaseStudyFutureRoadmap caseStudy={caseStudy} />);

    for (const roadmapItem of caseStudy.futureRoadmap) {
      expect(screen.getByText(roadmapItem.item)).toBeInTheDocument();
    }

    const clientItems = caseStudy.futureRoadmap.filter((item) => item.source === "client");
    const recommendationItems = caseStudy.futureRoadmap.filter(
      (item) => item.source === "byld-recommendation",
    );
    if (clientItems.length > 0) {
      expect(screen.getAllByText("Client plan").length).toBe(clientItems.length);
    }
    if (recommendationItems.length > 0) {
      expect(screen.getAllByText("Byld IQ recommendation").length).toBe(recommendationItems.length);
    }
  });

  it("gives the section a stable id for future in-page navigation", () => {
    const { container } = render(<CaseStudyFutureRoadmap caseStudy={caseStudy} />);

    expect(container.querySelector("#future-roadmap")).toBeInTheDocument();
  });
});
