import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { CaseStudyArchitecture } from "./CaseStudyArchitecture";
import { CASE_STUDIES } from "./data/case-studies";

const caseStudy = CASE_STUDIES.find((candidate) => candidate.slug === "fieldnote-mvp");
if (!caseStudy) throw new Error("Missing fieldnote-mvp case study fixture");

describe("CaseStudyArchitecture", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders every node and shows the first node's description by default", () => {
    render(<CaseStudyArchitecture caseStudy={caseStudy} />);

    const [firstNode] = caseStudy.architecture;
    if (!firstNode) throw new Error("Case study has no architecture nodes");

    for (const node of caseStudy.architecture) {
      expect(screen.getByRole("button", { name: node.label })).toBeInTheDocument();
    }
    expect(screen.getByRole("button", { name: firstNode.label })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByText(firstNode.description)).toBeInTheDocument();
  });

  it("shows another node's description on click and tracks the selection", async () => {
    const user = userEvent.setup();
    render(<CaseStudyArchitecture caseStudy={caseStudy} />);

    const secondNode = caseStudy.architecture[1];
    if (!secondNode) throw new Error("Case study needs at least two architecture nodes");

    await user.click(screen.getByRole("button", { name: secondNode.label }));

    expect(screen.getByText(secondNode.description)).toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith("case_study_architecture_node_selected", {
      slug: caseStudy.slug,
      node: secondNode.id,
    });
  });

  it("gives the section a stable id for future in-page navigation", () => {
    const { container } = render(<CaseStudyArchitecture caseStudy={caseStudy} />);

    expect(container.querySelector("#architecture")).toBeInTheDocument();
  });
});
