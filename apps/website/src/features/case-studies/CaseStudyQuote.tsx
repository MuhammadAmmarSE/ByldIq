import { TestimonialCard } from "@/components/TestimonialCard";
import { cn } from "@/utils/cn";

import { TESTIMONIALS } from "./data/testimonials";
import type { CaseStudyQuoteProps } from "./CaseStudyQuote.types";

/**
 * CLAUDE.md Part 11's "Client quote" on a project's detail page — reuses
 * the real `TestimonialCard` and `TESTIMONIALS` data (already grounded in
 * this case study's own `outcome`/`metrics`, per that data file's doc
 * comment) rather than a second, separately-authored quote field.
 * `TESTIMONIALS` only has an entry for 3 of the 5 case studies; renders
 * nothing for the other 2 rather than fabricating a quote (CLAUDE.md Part
 * 7). Not listed in `CaseStudySidebar` — it's supplementary to Results,
 * not a section every case study is guaranteed to have.
 */
export function CaseStudyQuote({ caseStudy, className }: CaseStudyQuoteProps) {
  const testimonial = TESTIMONIALS.find((candidate) => candidate.caseStudySlug === caseStudy.slug);
  if (!testimonial) return null;

  return (
    <TestimonialCard
      quote={testimonial.quote}
      authorName={testimonial.authorName}
      authorRole={testimonial.authorRole}
      className={cn("max-w-2xl", className)}
    />
  );
}
