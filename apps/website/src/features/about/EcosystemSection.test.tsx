import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { CASE_STUDIES } from "@/features/case-studies";

import { EcosystemSection } from "./EcosystemSection";

describe("EcosystemSection", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders the featured real case studies", () => {
    render(<EcosystemSection />);

    const fieldnote = CASE_STUDIES.find((caseStudy) => caseStudy.slug === "fieldnote-mvp");
    if (!fieldnote) throw new Error("Missing fieldnote-mvp fixture");
    expect(screen.getByText(fieldnote.headline)).toBeInTheDocument();
  });

  it("gives the section a stable id for the sidebar", () => {
    const { container } = render(<EcosystemSection />);
    expect(container.querySelector("#ecosystem")).toBeInTheDocument();
  });

  it("links to /work, and tracks the click", async () => {
    const user = userEvent.setup();
    render(<EcosystemSection />);

    const link = screen.getByRole("link", { name: /explore all our work/i });
    expect(link).toHaveAttribute("href", "/work");

    await user.click(link);
    expect(mockTrack).toHaveBeenCalledWith("about_cta_selected", { cta: "explore-work" });
  });
});
