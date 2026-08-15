import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const mockUseScrollSpy = vi.fn();
const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/hooks/useScrollSpy", () => ({
  useScrollSpy: (...args: unknown[]) => mockUseScrollSpy(...args),
}));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { CaseStudySidebar } from "./CaseStudySidebar";

describe("CaseStudySidebar", () => {
  it("renders a link for every section", () => {
    mockUseScrollSpy.mockReturnValue(null);
    render(<CaseStudySidebar slug="fieldnote-mvp" />);

    expect(screen.getByRole("link", { name: "Executive summary" })).toHaveAttribute(
      "href",
      "#executive-summary",
    );
    expect(screen.getByRole("link", { name: "Common questions" })).toHaveAttribute("href", "#faq");
  });

  it("marks the currently active section returned by the scrollspy hook", () => {
    mockUseScrollSpy.mockReturnValue("architecture");
    render(<CaseStudySidebar slug="fieldnote-mvp" />);

    expect(screen.getByRole("link", { name: "How it fits together" })).toHaveAttribute(
      "aria-current",
      "location",
    );
    expect(screen.getByRole("link", { name: "Executive summary" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("tracks case_study_section_viewed when the active section changes (Milestone 12)", () => {
    mockUseScrollSpy.mockReturnValue("architecture");
    render(<CaseStudySidebar slug="fieldnote-mvp" />);

    expect(mockTrack).toHaveBeenCalledWith("case_study_section_viewed", {
      slug: "fieldnote-mvp",
      section: "architecture",
    });
  });
});
