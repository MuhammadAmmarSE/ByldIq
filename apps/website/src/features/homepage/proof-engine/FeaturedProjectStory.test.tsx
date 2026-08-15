import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CASE_STUDIES } from "@/features/case-studies";

import { FeaturedProjectStory } from "./FeaturedProjectStory";

const caseStudy = CASE_STUDIES.find((cs) => cs.slug === "fieldnote-mvp");
if (!caseStudy) throw new Error("Missing fieldnote-mvp fixture");

const company = {
  id: "fieldnote",
  name: "Fieldnote",
  journey: "startup" as const,
  industry: "Field Services",
};

describe("FeaturedProjectStory", () => {
  it("links to the case study's dedicated page and calls onSelect when clicked", () => {
    const onSelect = vi.fn();
    render(<FeaturedProjectStory caseStudy={caseStudy} company={company} onSelect={onSelect} />);

    const link = screen.getByRole("link", { name: "Read the full story" });
    expect(link).toHaveAttribute("href", `/work/${caseStudy.slug}`);

    link.click();
    expect(onSelect).toHaveBeenCalledWith(caseStudy.slug);
  });

  it("renders the headline, industry, challenge, every metric, and every technology", () => {
    render(<FeaturedProjectStory caseStudy={caseStudy} company={company} />);

    expect(screen.getByRole("heading", { name: caseStudy.headline })).toBeInTheDocument();
    expect(screen.getByText(company.industry)).toBeInTheDocument();
    expect(screen.getByText(caseStudy.challenge)).toBeInTheDocument();
    for (const metric of caseStudy.metrics) {
      expect(screen.getByText(metric.value)).toBeInTheDocument();
    }
    for (const technology of caseStudy.technologies) {
      expect(screen.getByText(technology)).toBeInTheDocument();
    }
  });

  it("gives its visual band a slug-unique id", () => {
    const { container } = render(<FeaturedProjectStory caseStudy={caseStudy} company={company} />);
    expect(container.querySelector(`#featured-visual-${caseStudy.slug}`)).toBeInTheDocument();
  });
});
