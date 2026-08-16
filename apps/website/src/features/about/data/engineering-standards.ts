export interface EngineeringStandard {
  id: string;
  title: string;
  statement: string;
}

/**
 * CLAUDE.md Milestone 13 §5's Engineering Standards, in the spec's own
 * example voice ("Performance — We don't optimize because benchmarks
 * look good. We optimize because users notice latency.") — short,
 * declarative statements, not a procedural checklist. The ten principles
 * are CLAUDE.md Part 24's Engineering Constitution ("Core Principles"),
 * restated as manifesto lines rather than duplicated verbatim. The
 * homepage's `EngineeringExcellenceEngine` (Part 15) already covers *how*
 * these show up in this actual repository — real CI stages, real testing
 * tools — so this page stays about *why*, and links out for *how*
 * ("see it in practice") instead of repeating that content.
 */
export const ENGINEERING_STANDARDS: EngineeringStandard[] = [
  {
    id: "clarity",
    title: "Clarity",
    statement:
      "We don't write clever code. We write code the next engineer can understand without asking us first.",
  },
  {
    id: "correctness",
    title: "Correctness",
    statement:
      "A feature that works by accident is a bug waiting for its moment. We test for the failure states, not just the happy path.",
  },
  {
    id: "maintainability",
    title: "Maintainability",
    statement:
      "We optimize for the person maintaining this in two years — who might be us, and won't remember why.",
  },
  {
    id: "performance",
    title: "Performance",
    statement:
      "We don't optimize because benchmarks look good. We optimize because users notice latency.",
  },
  {
    id: "accessibility",
    title: "Accessibility",
    statement:
      "Accessible isn't a checklist we run at the end. It's a requirement a feature doesn't ship without.",
  },
  {
    id: "security",
    title: "Security",
    statement:
      "We assume every input is hostile until proven otherwise — because eventually, one will be.",
  },
  {
    id: "scalability",
    title: "Scalability",
    statement:
      "We design for the traffic and team size you'll actually reach next, not a hypothetical future that may never come.",
  },
  {
    id: "developer-experience",
    title: "Developer Experience",
    statement:
      "Slow, confusing tooling is a tax on every feature built afterward. We pay it down, not forward.",
  },
  {
    id: "observability",
    title: "Observability",
    statement: "If we can't see it happening in production, we don't actually know it's working.",
  },
  {
    id: "future-proofing",
    title: "Future-Proofing",
    statement:
      "Every decision gets asked the same question: would we still make this choice in five years?",
  },
];
