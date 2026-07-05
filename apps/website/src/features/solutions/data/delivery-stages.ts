export interface DeliveryStage {
  id: string;
  label: string;
  description: string;
}

/**
 * CLAUDE.md Part 20's Delivery Framework — the same nine-stage process for
 * every solution (Discovery through Optimization). Kept shared rather than
 * per-solution content: the process doesn't actually change by industry,
 * and authoring nine distinct-but-equivalent descriptions per solution
 * would just be padding, not information.
 */
export const DELIVERY_STAGES: DeliveryStage[] = [
  {
    id: "discovery",
    label: "Discovery",
    description:
      "Understand your business goals, constraints, and what success actually looks like before any technical decisions get made.",
  },
  {
    id: "research",
    label: "Research",
    description:
      "Validate assumptions against users, competitors, and existing systems so decisions rest on evidence rather than guesswork.",
  },
  {
    id: "planning",
    label: "Planning",
    description:
      "Decide what belongs in a first version versus what can wait, and sequence the work into a roadmap you can act on.",
  },
  {
    id: "architecture",
    label: "Architecture",
    description:
      "Design the system's foundations — data, services, integrations — so early choices don't become expensive to unwind later.",
  },
  {
    id: "design",
    label: "Design",
    description:
      "Translate the architecture into interfaces and flows that are accessible, intuitive, and consistent with how people actually work.",
  },
  {
    id: "engineering",
    label: "Engineering",
    description:
      "Build against the architecture with automated testing and code review built into every change, not bolted on afterward.",
  },
  {
    id: "testing",
    label: "Testing",
    description:
      "Verify functionality, accessibility, performance, and security before anything reaches production.",
  },
  {
    id: "deployment",
    label: "Deployment",
    description:
      "Ship through a repeatable pipeline with monitoring and rollback in place, so releases stay routine rather than risky.",
  },
  {
    id: "optimization",
    label: "Optimization",
    description:
      "Use real usage data to refine performance, experience, and the roadmap after launch — the product keeps improving instead of standing still.",
  },
];
