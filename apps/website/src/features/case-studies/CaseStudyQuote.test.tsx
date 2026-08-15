import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CaseStudyQuote } from "./CaseStudyQuote";
import { CASE_STUDIES } from "./data/case-studies";
import { TESTIMONIALS } from "./data/testimonials";

function requireCaseStudy(slug: string) {
  const found = CASE_STUDIES.find((candidate) => candidate.slug === slug);
  if (!found) throw new Error(`Missing ${slug} case study fixture`);
  return found;
}

describe("CaseStudyQuote", () => {
  it("renders the matching testimonial's quote and attribution", () => {
    const testimonial = TESTIMONIALS[0];
    if (!testimonial) throw new Error("Fixture requires at least one testimonial");
    const caseStudy = requireCaseStudy(testimonial.caseStudySlug);

    const { container } = render(<CaseStudyQuote caseStudy={caseStudy} />);

    expect(container.textContent).toContain(testimonial.quote);
    expect(screen.getByText(testimonial.authorName)).toBeInTheDocument();
    expect(screen.getByText(testimonial.authorRole)).toBeInTheDocument();
  });

  it("renders nothing for a case study with no testimonial, rather than fabricating one", () => {
    const withoutTestimonial = CASE_STUDIES.find(
      (candidate) =>
        !TESTIMONIALS.some((testimonial) => testimonial.caseStudySlug === candidate.slug),
    );
    if (!withoutTestimonial) throw new Error("Fixture requires a case study with no testimonial");

    const { container } = render(<CaseStudyQuote caseStudy={withoutTestimonial} />);
    expect(container).toBeEmptyDOMElement();
  });
});
