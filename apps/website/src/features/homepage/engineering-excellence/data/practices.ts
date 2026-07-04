export interface EngineeringPractice {
  id: string;
  title: string;
  summary: string;
  points: string[];
}

/**
 * CLAUDE.md Part 15's Engineering Excellence Engine, consolidated from the
 * spec's ten dashboard modules into five practice categories — a
 * proportionate scope for a homepage section rather than a second
 * full engineering-metrics platform. Every point here describes something
 * genuinely true of this repository (real CI stages, real testing tools,
 * real conventions), not fabricated infrastructure — this section is about
 * Byld IQ's own engineering, unlike the fictional company demos in the
 * Product Showcase.
 */
export const ENGINEERING_PRACTICES: EngineeringPractice[] = [
  {
    id: "repository-review",
    title: "Repository & Code Review",
    summary:
      "Every change ships through a feature branch and a reviewed pull request — never a direct push to the default branch.",
    points: [
      "Feature branches, never direct commits to the default branch",
      "Pull request review covers architecture, accessibility, performance, and security",
      "Semantic, descriptive commit messages over generic ones",
    ],
  },
  {
    id: "testing-cicd",
    title: "Testing & CI/CD",
    summary: "Every pull request runs the same automated pipeline before it can merge.",
    points: [
      "Unit tests (Vitest) for logic, hooks, and state",
      "Accessibility tests on every component story, via axe-core",
      "End-to-end tests (Playwright) including a full-page accessibility scan",
      "Typecheck, lint, and format checks run on every push",
    ],
  },
  {
    id: "security",
    title: "Security",
    summary:
      "Environment variables are validated, not trusted — and secrets never enter the repository.",
    points: [
      "Environment variables validated with Zod at startup, not read blindly",
      "Pre-commit hooks catch formatting and lint issues before they're pushed",
      "TypeScript strict mode and ESLint's strict ruleset across the codebase",
    ],
  },
  {
    id: "performance-accessibility",
    title: "Performance & Accessibility",
    summary: "Performance and accessibility are measured automatically, not assumed.",
    points: [
      "Lighthouse CI runs on every pull request against performance, accessibility, best practices, and SEO",
      "Server Components by default — client-side JavaScript only where interaction requires it",
      "WCAG AA is a merge gate: the accessibility test suite fails the build on violations, it doesn't just report them",
    ],
  },
  {
    id: "documentation",
    title: "Documentation",
    summary:
      "Every component and architectural decision is documented next to the code it describes.",
    points: [
      "Every reusable component ships with a short docs file: purpose, props, accessibility notes",
      "A living architecture document records the layering contract and component inventory",
      "Product and engineering decisions live in one governing document, not scattered tickets",
    ],
  },
];
