import type { CaseStudy } from "./case-study.schema";

/**
 * Fictional case studies (CLAUDE.md Part 13) — real business problems and
 * plausible outcomes attributed to fictional companies (Part 14's
 * "Acme Health, Nova Commerce..." convention), not claims about Byld IQ
 * itself, since this is a new site with no real client history yet.
 */
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "fieldnote-mvp",
    companyId: "fieldnote",
    headline: "From idea to a funded MVP in nine weeks.",
    challenge:
      "Fieldnote's founders had a validated idea but no engineering team, and needed to prove product-market fit before their seed round closed.",
    approach:
      "We scoped an MVP to the three workflows investors cared about most and instrumented it from day one, so real usage data — not guesses — drove the roadmap after launch.",
    outcome:
      "Fieldnote closed its seed round two months after launch, backed by real usage data instead of a pitch deck alone.",
    metrics: [
      { label: "Weekly active technicians", value: "1,200+" },
      { label: "Time to MVP", value: "9 weeks" },
    ],
    technologies: ["Next.js", "Supabase", "React Native"],
    featured: true,
  },
  {
    slug: "atlas-logistics-modernization",
    companyId: "atlas-logistics",
    headline: "Modernizing dispatch without a single day of downtime.",
    challenge:
      "Atlas Logistics ran dispatch operations on a 15-year-old on-premise system that couldn't support real-time tracking.",
    approach:
      "We modernized the platform incrementally behind a strangler-fig architecture, migrating one workflow at a time so dispatch never had to stop.",
    outcome:
      "Dispatch teams moved onto the new platform with zero unplanned downtime during the entire migration.",
    metrics: [
      { label: "Platform uptime", value: "99.97%" },
      { label: "Dispatch time reduced", value: "38%" },
    ],
    technologies: ["Kubernetes", "PostgreSQL", "Event-driven architecture"],
  },
  {
    slug: "nova-commerce-checkout",
    companyId: "nova-commerce",
    headline: "Rebuilding checkout for the moments that matter most.",
    challenge:
      "Nova Commerce's custom checkout was costing them conversions during their highest-traffic sales events.",
    approach:
      "We migrated to Shopify Plus with a custom Hydrogen storefront, rebuilding checkout specifically for peak-load performance.",
    outcome:
      "Checkout completion improved measurably during the following peak sales season, with no downtime under load.",
    metrics: [
      { label: "Checkout conversion", value: "+17%" },
      { label: "Page load time", value: "-1.4s" },
    ],
    technologies: ["Shopify Plus", "Hydrogen", "Klaviyo"],
    featured: true,
  },
  {
    slug: "northwind-ai-support-assistant",
    companyId: "northwind-ai",
    headline: "Turning a documentation backlog into an assistant.",
    challenge:
      "Northwind AI's support team was drowning in repetitive tickets that their own documentation already answered.",
    approach:
      "We built a retrieval-augmented assistant grounded in their existing knowledge base, with a clear, visible handoff to a human whenever it wasn't confident.",
    outcome: "First-response time dropped sharply without any reduction in resolution quality.",
    metrics: [
      { label: "First-response time", value: "-64%" },
      { label: "Tickets auto-resolved", value: "41%" },
    ],
    technologies: ["OpenAI", "pgvector", "LangChain"],
  },
  {
    slug: "harborline-developer-platform",
    companyId: "harborline-cloud",
    headline: "Giving engineers minutes back, every single day.",
    challenge:
      "Harborline Cloud's engineers spent more time provisioning infrastructure than shipping features.",
    approach:
      "We built a self-service developer platform with golden-path templates and automated environment provisioning.",
    outcome:
      "New service provisioning time dropped from days to minutes, and deploy frequency tripled.",
    metrics: [
      { label: "Environment provisioning", value: "2 days -> 12 min" },
      { label: "Deploy frequency", value: "3x" },
    ],
    technologies: ["Terraform", "Kubernetes", "Backstage"],
  },
];
