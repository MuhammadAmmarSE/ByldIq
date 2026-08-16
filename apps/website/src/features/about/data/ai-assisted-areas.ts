export interface AiAssistedArea {
  id: string;
  title: string;
  description: string;
}

/**
 * CLAUDE.md Milestone 13 §13's AI Philosophy: the areas AI assists with,
 * each stated alongside what stays a human decision — the "accelerator,
 * not a substitute" distinction has to be concrete per area, or it's just
 * a slogan.
 */
export const AI_ASSISTED_AREAS: AiAssistedArea[] = [
  {
    id: "development",
    title: "Development",
    description:
      "Accelerates implementation and boilerplate — architecture and code review stay human.",
  },
  {
    id: "research",
    title: "Research",
    description:
      "Synthesizes competitive and technical research faster — the conclusions get verified, not assumed.",
  },
  {
    id: "architecture-exploration",
    title: "Architecture Exploration",
    description:
      "Drafts candidate architectures and their trade-offs quickly — the team decides which one, and why.",
  },
  {
    id: "testing",
    title: "Testing",
    description:
      "Runs automated accessibility and performance scans continuously — manual review still catches what automation can't.",
  },
  {
    id: "documentation",
    title: "Documentation",
    description:
      "Drafts first-pass explanations of a decision — the reasoning it documents is checked against what actually happened.",
  },
  {
    id: "product-discovery",
    title: "Product Discovery",
    description:
      "Helps a visitor think through their own product in BuildPath and the AI Companion — it recommends, never decides.",
  },
  {
    id: "automation",
    title: "Automation",
    description:
      "Removes repetitive operational work — never hidden behind a black box a team can't inspect.",
  },
];
