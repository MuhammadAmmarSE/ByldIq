export interface TimelineStageDefinition {
  id: string;
  title: string;
  headline: string;
  description: string;
  overview: string;
  commonMistake: string;
  approach: string;
  deliverables: string[];
  technologies: string[];
}

/**
 * CLAUDE.md Part 12's ten-stage product thinking journey. Headline and
 * description are verbatim from the spec; the side-panel fields (overview,
 * common mistake, approach, deliverables, technologies) are original
 * supplementary copy authored to the same voice (Part 7: teach, reduce
 * uncertainty, no hype) since the spec only gives the top-level narrative.
 */
export const TIMELINE_STAGES: TimelineStageDefinition[] = [
  {
    id: "idea",
    title: "Idea",
    headline: "Every great product begins with uncertainty.",
    description: "Ideas are rarely complete. The first objective is understanding.",
    overview:
      "Most ideas arrive as a feeling, not a plan. Before any engineering starts, we separate the problem worth solving from the solution already assumed.",
    commonMistake: "Committing to a feature set before validating the underlying problem.",
    approach: "We ask why the idea matters before asking how to build it.",
    deliverables: ["Problem statement", "Initial assumptions log"],
    technologies: [],
  },
  {
    id: "discovery",
    title: "Discovery",
    headline: "Understand the business before writing code.",
    description: "Stakeholders. Goals. Risks. Constraints. Current systems. Success metrics.",
    overview:
      "Discovery maps who the product serves, what already exists, and what success actually looks like — before any architecture decision gets made.",
    commonMistake:
      "Skipping stakeholder interviews because the founder already 'knows the answer.'",
    approach:
      "We interview the people closest to the problem, not just the people funding the solution.",
    deliverables: ["Stakeholder map", "Constraints & risks log", "Success metrics"],
    technologies: [],
  },
  {
    id: "research",
    title: "Research",
    headline: "Assumptions become evidence.",
    description: "Competitors. Users. Technology. Industry. Analytics.",
    overview:
      "Research replaces opinion with evidence — competitive analysis, user behavior, and technical feasibility all shape what Version 1 should actually include.",
    commonMistake: "Researching competitors' features instead of competitors' customers.",
    approach: "We study what users struggle with, not just what competitors have shipped.",
    deliverables: ["Competitive analysis", "User research summary"],
    technologies: ["Analytics tooling", "User interviews"],
  },
  {
    id: "strategy",
    title: "Strategy",
    headline: "Choose what not to build.",
    description: "Roadmap. Priorities. Version 1. Future phases. Technical strategy.",
    overview:
      "Strategy turns research into sequencing: what belongs in Version 1, what's deliberately deferred, and why — so scope stays a decision, not an accident.",
    commonMistake: "Treating every requested feature as equally important.",
    approach: "We prioritize by business outcome, not by who asked loudest.",
    deliverables: ["Phased roadmap", "Version 1 scope"],
    technologies: [],
  },
  {
    id: "architecture",
    title: "Architecture",
    headline: "Strong foundations create scalable products.",
    description: "Backend. Frontend. Infrastructure. Data. Security. Performance.",
    overview:
      "Architecture decisions made here are the most expensive to reverse later — we design for the traffic and team size the product will actually reach.",
    commonMistake: "Over-engineering for scale the product may never reach.",
    approach: "We design for the next stage of growth, not for a hypothetical future.",
    deliverables: ["System diagram", "Technology decision records"],
    technologies: ["Next.js", "PostgreSQL", "Cloud infrastructure"],
  },
  {
    id: "experience-design",
    title: "Experience Design",
    headline: "Engineering begins with empathy.",
    description: "Users. Accessibility. Interaction. Flows. Prototype.",
    overview:
      "Interfaces are prototyped and tested with real interaction flows before a single production component is built, so usability issues surface early and cheaply.",
    commonMistake: "Designing screens before mapping the user's actual task flow.",
    approach: "We prototype the flow first, then the visuals, then the component.",
    deliverables: ["Wireframes", "Interactive prototype", "Accessibility notes"],
    technologies: ["Figma", "Design tokens"],
  },
  {
    id: "engineering",
    title: "Engineering",
    headline: "Thoughtful code outlives trends.",
    description: "Architecture. Testing. CI/CD. Monitoring. Documentation.",
    overview:
      "Engineering follows the architecture and design already agreed on — every feature ships with tests, review, and documentation as part of 'done,' not an afterthought.",
    commonMistake: "Treating documentation and tests as optional cleanup for later.",
    approach: "We treat tests and docs as part of the feature, not a follow-up task.",
    deliverables: ["Production code", "Test coverage", "CI/CD pipeline"],
    technologies: ["TypeScript", "GitHub Actions", "Vitest"],
  },
  {
    id: "testing",
    title: "Testing",
    headline: "Confidence comes from validation.",
    description: "Accessibility. Performance. QA. Automation. Monitoring.",
    overview:
      "Before launch, the product is validated against accessibility, performance, and real-device behavior — not just 'does it work on my machine.'",
    commonMistake: "Only testing the happy path before shipping.",
    approach: "We test the edge cases and failure states as carefully as the primary flow.",
    deliverables: ["Accessibility audit", "Performance report", "QA sign-off"],
    technologies: ["Playwright", "Lighthouse", "axe-core"],
  },
  {
    id: "launch",
    title: "Launch",
    headline: "Launch is the beginning.",
    description: "Monitoring. Analytics. User feedback. Iteration.",
    overview:
      "Launch day is instrumented from the start — real usage data and user feedback begin shaping the next iteration immediately.",
    commonMistake: "Treating launch as the finish line instead of the starting line.",
    approach: "We watch real usage from day one and plan the next iteration around it.",
    deliverables: ["Launch checklist", "Monitoring dashboard"],
    technologies: ["Analytics", "Error tracking"],
  },
  {
    id: "growth",
    title: "Growth",
    headline: "Products evolve continuously.",
    description: "Optimization. AI. Automation. Scaling. New features.",
    overview:
      "Growth is where the roadmap's later phases come to life — optimizing what's working, automating what's manual, and scaling the architecture deliberately.",
    commonMistake: "Adding new features faster than the architecture can absorb them.",
    approach: "We grow the product and the architecture together, not one ahead of the other.",
    deliverables: ["Growth roadmap", "Optimization backlog"],
    technologies: [],
  },
];
