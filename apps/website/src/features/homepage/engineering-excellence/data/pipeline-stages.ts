export interface PipelineStage {
  id: string;
  label: string;
  description: string;
}

/** The real stages this repository's CI pipeline runs on every pull request. */
export const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: "commit",
    label: "Commit",
    description: "A change is pushed to a feature branch, never directly to the default branch.",
  },
  {
    id: "typecheck-lint",
    label: "Typecheck & Lint",
    description: "TypeScript strict mode and ESLint run across the whole repository.",
  },
  {
    id: "test",
    label: "Test",
    description:
      "Unit tests, Storybook accessibility tests, and Playwright end-to-end tests all run.",
  },
  {
    id: "build",
    label: "Build",
    description: "The production Next.js build and the Storybook static build both must succeed.",
  },
  {
    id: "lighthouse",
    label: "Lighthouse",
    description:
      "Performance, accessibility, best-practices, and SEO are measured against budgets.",
  },
  {
    id: "review",
    label: "Review",
    description:
      "A pull request review checks architecture, accessibility, performance, and security.",
  },
  {
    id: "merge",
    label: "Merge",
    description: "Only after every prior stage passes does the change merge.",
  },
];
