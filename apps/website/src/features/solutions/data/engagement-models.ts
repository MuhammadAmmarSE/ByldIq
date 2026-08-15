import type { EngagementModel } from "./engagement-model.schema";

/**
 * Milestone 10's Engagement Models: five delivery models, each with
 * best-for/pros/process/team-structure. These describe *how* an
 * engagement is structured — orthogonal to *what* is being built
 * (`SOLUTIONS`) and *who* it's for (`INDUSTRIES`). "Dedicated Team" here
 * is deliberately lighter-weight than the full "Dedicated Teams" solution
 * page — this describes the general delivery pattern (applicable
 * alongside any solution), the solution page describes that specific,
 * fully-scoped service.
 */
export const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    slug: "fixed-scope",
    label: "Fixed Scope",
    description:
      "A defined deliverable, timeline, and price, agreed before work starts — the right fit when requirements are already clear.",
    bestFor: [
      "Well-defined deliverables with a clear scope and end date",
      "Projects where requirements are unlikely to change significantly",
      "Teams that need a fixed budget and timeline for planning purposes",
    ],
    pros: [
      "Predictable cost and timeline",
      "Clear deliverable definition upfront",
      "Lower ongoing management overhead",
    ],
    process: [
      "Scope and requirements defined and agreed upfront",
      "Fixed price and timeline quoted against that scope",
      "Delivery against milestones, with change requests handled explicitly rather than silently absorbed",
    ],
    teamStructure: ["1 Project Lead", "Engineers sized to the scope", "QA"],
  },
  {
    slug: "agile-team",
    label: "Agile Team",
    description:
      "Continuous, sprint-based delivery against a backlog you help prioritize — the right fit when requirements will evolve as you learn.",
    bestFor: [
      "Products where requirements will evolve as you learn",
      "Teams that want to prioritize and re-prioritize the backlog together",
      "Ongoing product development without a fixed end date",
    ],
    pros: [
      "Adapts as priorities change",
      "Continuous delivery of working software",
      "Direct collaboration on prioritization",
    ],
    process: [
      "Backlog defined and continuously refined together",
      "Work delivered in short, regular sprints",
      "Priorities revisited every sprint based on what's been learned",
    ],
    teamStructure: ["1 Product Manager", "Cross-functional engineers", "Designer as needed"],
  },
  {
    slug: "dedicated-team",
    label: "Dedicated Team",
    description:
      "An embedded team, sustained for as long as your roadmap requires it — see the full Dedicated Teams solution for the complete picture.",
    bestFor: [
      "Sustained, ongoing product or platform work",
      "Organizations that want an embedded team, not a project",
      "Specialized capacity (AI, mobile, platform) without a permanent hire",
    ],
    pros: [
      "Team retains context across months",
      "Scales up or down with your roadmap",
      "Integrates into your existing tools and standups",
    ],
    process: [
      "Team composition designed around your roadmap",
      "Full onboarding into your tools and processes",
      "Ongoing embedded delivery, reviewed against your priorities",
    ],
    teamStructure: ["Scales with your roadmap", "1 Engineering Lead", "Specialists as needed"],
    relatedSolutionSlug: "dedicated-teams",
  },
  {
    slug: "staff-augmentation",
    label: "Staff Augmentation",
    description:
      "One or more engineers embedded directly into your existing team and process — the fastest way to add capacity.",
    bestFor: [
      "Filling a specific skill gap on an existing internal team",
      "Short-to-medium-term capacity needs",
      "Teams that already have their own process and just need more hands",
    ],
    pros: [
      "Fastest way to add capacity to an existing team",
      "No change to your existing process or tooling",
      "Flexible duration",
    ],
    process: [
      "Skill gap and duration defined",
      "Engineer(s) join your existing team directly",
      "Managed by your own team leads, not a separate account manager",
    ],
    teamStructure: ["One or more engineers embedded directly into your team"],
  },
  {
    slug: "product-partnership",
    label: "Product Partnership",
    description:
      "A long-term engineering partner invested in the product's outcomes, not just its delivery — for products where decisions compound over years.",
    bestFor: [
      "Founders who want an engineering partner invested in the product's success, not just its delivery",
      "Long-term products where technical decisions compound over years",
      "Teams that want strategic input, not just execution",
    ],
    pros: [
      "Engineering partner thinks about product outcomes, not just tickets",
      "Continuity across the product's entire lifecycle",
      "Deeper trust and shared accountability over time",
    ],
    process: [
      "Shared product strategy, not just a technical backlog",
      "Regular strategic reviews alongside sprint delivery",
      "Long-term technical roadmap owned jointly",
    ],
    teamStructure: ["Embedded team plus senior technical strategy involvement"],
  },
];
