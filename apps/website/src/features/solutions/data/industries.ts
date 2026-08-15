import type { Industry } from "./industry.schema";

/**
 * Milestone 10's Industries section: ten industries, each with typical
 * challenges (Byld IQ's own expertise framing, not a claim about any real
 * company), recommended solutions (real `SOLUTIONS` slugs), and example
 * case studies where a real one exists.
 *
 * Several industries (FinTech, Real Estate, Education, Manufacturing,
 * Healthcare, E-commerce) have `exampleCaseStudySlugs: []` — there is no
 * real case study in that industry yet, and CLAUDE.md Part 13 rules out
 * inventing one just to fill the list. The UI states this honestly rather
 * than hiding the industry or fabricating a story (the same "state the
 * gap, don't fabricate" pattern the Knowledge Center's placeholder
 * content types already use).
 *
 * Where a case study genuinely does apply, it's the one already tagged
 * with that exact industry in `FICTIONAL_COMPANIES` (e.g. Nova Commerce
 * is tagged "Retail," not "E-commerce" — so Retail links to it and
 * E-commerce doesn't, rather than stretching one company across two
 * industries the site itself treats as distinct).
 */
export const INDUSTRIES: Industry[] = [
  {
    slug: "healthcare",
    label: "Healthcare",
    description:
      "Digital products for healthcare organizations balance patient trust, regulatory scrutiny, and integration with systems that were never designed to talk to each other.",
    challenges: [
      "Handling sensitive patient data within strict compliance requirements",
      "Integrating with legacy clinical and scheduling systems that resist change",
      "Earning clinician and patient trust in a new digital workflow",
    ],
    recommendedSolutionSlugs: ["enterprise", "custom-engineering"],
    exampleCaseStudySlugs: [],
  },
  {
    slug: "fintech",
    label: "FinTech",
    description:
      "Financial products carry a lower tolerance for downtime, ambiguity, or data errors than almost any other category of software.",
    challenges: [
      "Meeting regulatory and audit requirements without slowing every release",
      "Handling money movement correctly under every edge case, not just the common path",
      "Building trust with users who are inherently risk-averse about financial tools",
    ],
    recommendedSolutionSlugs: ["enterprise", "saas-development"],
    exampleCaseStudySlugs: [],
  },
  {
    slug: "e-commerce",
    label: "E-commerce",
    description:
      "E-commerce products live or die on checkout performance, peak-traffic reliability, and how much manual operational work they create.",
    challenges: [
      "Checkout abandonment driven by performance or friction",
      "Peak-traffic events that a normal architecture wasn't built for",
      "Operational tooling sprawl across separate apps that don't talk to each other",
    ],
    recommendedSolutionSlugs: ["commerce", "saas-development"],
    exampleCaseStudySlugs: [],
  },
  {
    slug: "logistics",
    label: "Logistics",
    description:
      "Logistics software has to work as reliably in a warehouse or a truck cab as it does in an office, often with unreliable connectivity.",
    challenges: [
      "Coordinating systems across dispatch, warehouse, and field operations",
      "Legacy infrastructure that can't be replaced in a single cutover",
      "Field conditions like poor connectivity that office software doesn't anticipate",
    ],
    recommendedSolutionSlugs: ["enterprise", "custom-engineering", "cloud-infrastructure"],
    exampleCaseStudySlugs: ["atlas-logistics-modernization"],
  },
  {
    slug: "real-estate",
    label: "Real Estate",
    description:
      "Real estate products bridge long, high-stakes transactions with day-to-day operational tools — and often both at once.",
    challenges: [
      "Managing long, multi-party transaction workflows without losing data along the way",
      "Integrating with MLS and other industry-specific data sources",
      "Presenting property data and media performantly at scale",
    ],
    recommendedSolutionSlugs: ["saas-development", "custom-engineering"],
    exampleCaseStudySlugs: [],
  },
  {
    slug: "education",
    label: "Education",
    description:
      "Education products serve multiple, very different user types — students, educators, administrators — in the same system.",
    challenges: [
      "Designing for very different technical comfort levels across user types",
      "Handling academic terms, cohorts, and enrollment cycles correctly",
      "Accessibility requirements that are both a legal and a pedagogical necessity",
    ],
    recommendedSolutionSlugs: ["saas-development", "mobile-development"],
    exampleCaseStudySlugs: [],
  },
  {
    slug: "manufacturing",
    label: "Manufacturing",
    description:
      "Manufacturing software often has to integrate with physical equipment and decades-old operational systems that weren't built with APIs in mind.",
    challenges: [
      "Integrating with equipment and legacy systems with no modern API",
      "Operational downtime tolerance close to zero",
      "Data from the factory floor that doesn't always arrive clean or on time",
    ],
    recommendedSolutionSlugs: ["custom-engineering", "automation", "cloud-infrastructure"],
    exampleCaseStudySlugs: [],
  },
  {
    slug: "retail",
    label: "Retail",
    description:
      "Retail spans in-store, online, and everything connecting the two — inventory, fulfillment, and a consistent customer experience across channels.",
    challenges: [
      "Keeping inventory accurate across in-store and online channels",
      "Fulfillment and shipping logic that scales during peak seasons",
      "A checkout and browsing experience that has to perform under real traffic, not just in a demo",
    ],
    recommendedSolutionSlugs: ["commerce"],
    exampleCaseStudySlugs: ["nova-commerce-checkout"],
  },
  {
    slug: "startups",
    label: "Startups",
    description:
      "Startup software has to prove a hypothesis fast, on a budget, without accumulating technical debt that blocks the next round.",
    challenges: [
      "Validating product-market fit before running out of runway",
      "Building an architecture that survives your first round of funding without a rewrite",
      "Making credible technical decisions without a large in-house engineering team yet",
    ],
    recommendedSolutionSlugs: ["startup", "saas-development", "mobile-development"],
    exampleCaseStudySlugs: ["fieldnote-mvp"],
  },
  {
    slug: "enterprise",
    label: "Enterprise",
    description:
      "Enterprise software has to satisfy security, compliance, and integration requirements that a smaller organization would never encounter.",
    challenges: [
      "Modernizing legacy systems without a risky big-bang cutover",
      "Meeting security and compliance requirements that touch every layer of the system",
      "Coordinating delivery across multiple internal stakeholders and existing systems",
    ],
    recommendedSolutionSlugs: ["enterprise", "dedicated-teams", "cloud-infrastructure"],
    exampleCaseStudySlugs: ["atlas-logistics-modernization"],
  },
];
