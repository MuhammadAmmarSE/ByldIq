import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CASE_STUDIES } from "@/features/case-studies";

import { ProjectCard } from "./ProjectCard";

const caseStudy = CASE_STUDIES.find((cs) => cs.slug === "nova-commerce-checkout");
if (!caseStudy) throw new Error("Missing nova-commerce-checkout fixture");

const company = {
  id: "nova-commerce",
  name: "Nova Commerce",
  journey: "commerce" as const,
  industry: "Retail",
};

describe("ProjectCard", () => {
  it("links to the case study's dedicated page (not a modal)", () => {
    render(<ProjectCard caseStudy={caseStudy} company={company} />);

    const link = screen.getByRole("link", { name: caseStudy.headline });
    expect(link).toHaveAttribute("href", `/work/${caseStudy.slug}`);
  });

  it("calls onSelect with the slug when clicked", () => {
    const onSelect = vi.fn();
    render(<ProjectCard caseStudy={caseStudy} company={company} onSelect={onSelect} />);

    screen.getByRole("link", { name: caseStudy.headline }).click();
    expect(onSelect).toHaveBeenCalledWith(caseStudy.slug);
  });

  it("renders the top metrics and technologies", () => {
    render(<ProjectCard caseStudy={caseStudy} company={company} />);

    const [firstMetric] = caseStudy.metrics;
    if (!firstMetric) throw new Error("Fixture must have at least one metric");
    expect(screen.getByText(firstMetric.value)).toBeInTheDocument();
    for (const technology of caseStudy.technologies) {
      expect(screen.getByText(technology)).toBeInTheDocument();
    }
  });
});
