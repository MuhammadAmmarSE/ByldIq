export interface ApproachStage {
  id: string;
  title: string;
  headline: string;
  whatHappens: string;
  whoParticipates: string;
  deliverables: string[];
  typicalDecisions: string;
  howAiAssists: string;
  successLooksLike: string;
}

/**
 * CLAUDE.md Milestone 13 §4's "The Byld IQ Approach": nine stages
 * (Understand -> Explore -> Define -> Design -> Architect -> Build ->
 * Validate -> Launch -> Evolve). A close cousin of the homepage's
 * `ProductThinkingTimeline` (Part 12's ten-stage journey) — same
 * interaction pattern (Tabs, one active stage), deliberately different
 * content: that timeline explains how Byld IQ thinks about product
 * development in general; this one explains what a real client
 * engagement actually looks like stage by stage, per the spec's specific
 * fields (what happens, who participates, deliverables, typical
 * decisions, how AI assists, what success looks like) — reusing the
 * timeline itself rather than its content would answer a different
 * question than the one this page asks.
 */
export const APPROACH_STAGES: ApproachStage[] = [
  {
    id: "understand",
    title: "Understand",
    headline: "Separate the problem worth solving from the solution already assumed.",
    whatHappens:
      "We interview stakeholders, map existing systems, and document goals, risks, and constraints — before any technology gets discussed.",
    whoParticipates:
      "A product strategist leads it, with the client's founders or stakeholders, and a senior engineer for early feasibility questions.",
    deliverables: ["Problem statement", "Stakeholder map", "Constraints & risks log"],
    typicalDecisions:
      "What actually needs understanding at this stage, and who needs to be interviewed before we can move on.",
    howAiAssists:
      "Summarizing interview notes and surfacing patterns across stakeholder input — never replacing the conversation itself.",
    successLooksLike: "Everyone agrees on the problem statement before anyone mentions a stack.",
  },
  {
    id: "explore",
    title: "Explore",
    headline: "Replace opinion with evidence.",
    whatHappens:
      "Competitive analysis, user research, and technical feasibility work shape what Version 1 should actually include.",
    whoParticipates:
      "Product strategist and a UX researcher, with a technical lead scoping feasibility questions.",
    deliverables: ["Competitive analysis", "User research summary", "Technical feasibility notes"],
    typicalDecisions:
      "Which assumptions genuinely need validating before Define, and early build-vs-buy signals.",
    howAiAssists:
      "Synthesizing research faster and drafting first-pass comparison matrices, which Byld's team then verifies.",
    successLooksLike: "Assumptions are backed by evidence, not by who argued loudest.",
  },
  {
    id: "define",
    title: "Define",
    headline: "Choose what not to build.",
    whatHappens:
      "Research turns into sequencing: what belongs in Version 1, what's deliberately deferred, and why.",
    whoParticipates:
      "Product strategist and the client's stakeholders, in a prioritization workshop.",
    deliverables: ["Phased roadmap", "Version 1 scope", "Prioritization rationale"],
    typicalDecisions: "What gets cut from Version 1, and the business reason behind each cut.",
    howAiAssists:
      "Modeling roadmap scenarios and trade-offs quickly — the prioritization decision itself stays human.",
    successLooksLike: "Scope is a deliberate decision, not an accident of who asked loudest.",
  },
  {
    id: "design",
    title: "Design",
    headline: "Engineering begins with empathy.",
    whatHappens:
      "Interfaces are prototyped and tested against real interaction flows before a single production component is built.",
    whoParticipates:
      "A product designer and UX researcher, with engineering reviewing feasibility.",
    deliverables: ["Wireframes", "Interactive prototype", "Accessibility notes"],
    typicalDecisions:
      "Which flows get prototyped first, and what needs deliberate accessibility handling versus what's accessible by default.",
    howAiAssists:
      "Generating first-draft component variations for designers to refine — nothing ships unreviewed.",
    successLooksLike: "Usability issues surface here, before a single production component exists.",
  },
  {
    id: "architect",
    title: "Architect",
    headline: "Strong foundations create scalable products.",
    whatHappens:
      "The decisions made here are the most expensive to reverse later — data model, infrastructure, and integration boundaries.",
    whoParticipates:
      "A solution architect and senior engineers, with a security review for sensitive domains.",
    deliverables: ["System diagram", "Technology decision records", "Risk assessment"],
    typicalDecisions:
      "Monolith versus services, data ownership boundaries, and what to build versus what to buy.",
    howAiAssists: "Drafting candidate architectures and their trade-offs for the team to evaluate.",
    successLooksLike: "We can still explain why a decision was made, five years later.",
  },
  {
    id: "build",
    title: "Build",
    headline: "Thoughtful code outlives trends.",
    whatHappens:
      "Engineering follows the architecture and design already agreed on. Tests, review, and documentation ship with the feature, not after it.",
    whoParticipates: "The engineering team, with product reviewing for acceptance.",
    deliverables: ["Production code", "Test coverage", "CI/CD pipeline"],
    typicalDecisions:
      "How to sequence features within a sprint, and how to handle scope discovered mid-build.",
    howAiAssists:
      "Accelerating implementation and boilerplate — architecture and code review stay human.",
    successLooksLike: "Tests and documentation are part of 'done,' not a follow-up task.",
  },
  {
    id: "validate",
    title: "Validate",
    headline: "Confidence comes from validation.",
    whatHappens:
      "The product is checked against accessibility, performance, and real-device behavior — not just 'does it work on my machine.'",
    whoParticipates: "QA, an accessibility review, and the engineers who built the feature.",
    deliverables: ["Accessibility audit", "Performance report", "QA sign-off"],
    typicalDecisions: "What genuinely blocks launch versus what ships as a fast-follow.",
    howAiAssists:
      "Running automated accessibility and performance scans continuously — never replacing manual review.",
    successLooksLike: "Edge cases and failure states are tested as carefully as the primary flow.",
  },
  {
    id: "launch",
    title: "Launch",
    headline: "Launch is the beginning.",
    whatHappens:
      "Monitoring and analytics are instrumented from day one — real usage and feedback start shaping the next iteration immediately.",
    whoParticipates: "Engineering monitors the launch; product triages early feedback.",
    deliverables: ["Launch checklist", "Monitoring dashboard", "Rollback plan"],
    typicalDecisions: "What 'success' actually looks like in the first thirty days.",
    howAiAssists: "Surfacing anomalies in usage data faster than a manual review would catch them.",
    successLooksLike: "Launch day tells us something we didn't already know.",
  },
  {
    id: "evolve",
    title: "Evolve",
    headline: "Products evolve continuously.",
    whatHappens:
      "The roadmap's later phases come to life: optimizing what's working, automating what's manual, and scaling the architecture deliberately.",
    whoParticipates: "Product and engineering, together, on an ongoing basis.",
    deliverables: ["Growth roadmap", "Optimization backlog"],
    typicalDecisions:
      "What to automate next, and when to revisit architecture decisions made under earlier constraints.",
    howAiAssists: "Identifying optimization opportunities in real usage patterns.",
    successLooksLike: "The product and the architecture grow together, not one ahead of the other.",
  },
];
