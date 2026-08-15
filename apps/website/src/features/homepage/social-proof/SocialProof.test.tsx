import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const { mockTrack } = vi.hoisted(() => ({ mockTrack: vi.fn() }));

vi.mock("@/providers/AnalyticsProvider", () => ({
  useAnalytics: () => ({ track: mockTrack }),
}));

import { CASE_STUDIES, FICTIONAL_COMPANIES, TESTIMONIALS } from "@/features/case-studies";

import { SocialProof } from "./SocialProof";

describe("SocialProof", () => {
  afterEach(() => {
    mockTrack.mockClear();
  });

  it("renders every testimonial quote and its source metric", () => {
    render(<SocialProof />);

    const caseStudiesBySlug = new Map(CASE_STUDIES.map((caseStudy) => [caseStudy.slug, caseStudy]));

    for (const testimonial of TESTIMONIALS) {
      expect(screen.getByText(new RegExp(testimonial.authorName))).toBeInTheDocument();
      const metric = caseStudiesBySlug.get(testimonial.caseStudySlug)?.metrics[0];
      if (metric) {
        expect(screen.getByText(`${metric.label}: ${metric.value}`)).toBeInTheDocument();
      }
    }
  });

  it("renders every fictional company", () => {
    render(<SocialProof />);

    for (const company of FICTIONAL_COMPANIES) {
      expect(screen.getByText(company.name)).toBeInTheDocument();
    }
  });

  it("links companies with a real case study, and tracks the click", async () => {
    const user = userEvent.setup();
    render(<SocialProof />);

    const fieldnoteLink = screen.getByRole("link", { name: "Fieldnote" });
    expect(fieldnoteLink).toHaveAttribute("href", "/work/fieldnote-mvp");

    await user.click(fieldnoteLink);
    expect(mockTrack).toHaveBeenCalledWith("social_proof_company_clicked", {
      companyId: "fieldnote",
    });
  });

  it("renders companies without a case study as plain text, not a dead link", () => {
    render(<SocialProof />);

    expect(screen.getByText("Acme Health")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Acme Health" })).not.toBeInTheDocument();
  });
});
