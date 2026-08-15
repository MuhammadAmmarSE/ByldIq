export interface Testimonial {
  id: string;
  companyId: string;
  caseStudySlug: string;
  quote: string;
  authorName: string;
  authorRole: string;
}

/**
 * Testimonials from the fictional companies (CLAUDE.md Part 14) whose case
 * studies already exist in `case-studies.ts`. Every quote is grounded in
 * that case study's real `outcome`/`metrics` fields rather than generic
 * praise (Part 7: "Testimonials: Authentic. Specific. Evidence-based.
 * Avoid generic praise.") — no new numbers are introduced here beyond
 * what the case study itself already establishes.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "fieldnote",
    companyId: "fieldnote",
    caseStudySlug: "fieldnote-mvp",
    quote:
      "We closed our seed round eight weeks after launch, backed by real usage data instead of a pitch deck alone. Scoping to three workflows instead of everything on our wishlist is the reason we shipped in nine weeks at all.",
    authorName: "Priya Nair",
    authorRole: "Co-Founder & CEO, Fieldnote",
  },
  {
    id: "nova-commerce",
    companyId: "nova-commerce",
    caseStudySlug: "nova-commerce-checkout",
    quote:
      "Checkout conversion improved 17% and we had zero downtime through our biggest sales event ever. They load-tested against our actual historical peak traffic before launch, which caught capacity issues we would never have found ourselves.",
    authorName: "Marcus Webb",
    authorRole: "VP Engineering, Nova Commerce",
  },
  {
    id: "harborline-cloud",
    companyId: "harborline-cloud",
    caseStudySlug: "harborline-developer-platform",
    quote:
      "New service provisioning went from two days to twelve minutes, and our platform team's ticket volume dropped 58%. The golden-path templates solved our common case so the team could focus on what actually needed judgment.",
    authorName: "Elena Vasquez",
    authorRole: "Head of Platform Engineering, Harborline Cloud",
  },
];
