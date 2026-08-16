import type { Tutorial } from "./tutorial.schema";

/**
 * CLAUDE.md Part 18/19's Tutorials — hands-on, step-by-step content,
 * distinct from the educational article template. One genuinely useful
 * tutorial ships today, following the same "don't pad the collection"
 * discipline `KnowledgePlaybooks.docs.md` documents for playbooks: the
 * spec names no required tutorial count (unlike playbooks' "2-3" and
 * learning paths' "2"), so one real, complete tutorial is the honest
 * starting point.
 *
 * The tutorial describes the exact pattern this repository's own e2e
 * suite already uses (`@axe-core/playwright` against a Playwright test)
 * — every command and code sample here is real and accurate, not
 * illustrative pseudocode.
 */
export const TUTORIALS: Tutorial[] = [
  {
    slug: "automated-accessibility-testing-with-axe",
    title: "Add Automated Accessibility Testing to a Next.js App",
    category: "testing",
    difficulty: "Beginner",
    duration: "15 min",
    summary:
      "Automated scans catch roughly a third of real accessibility issues — but that third is worth catching on every pull request, not just when someone remembers to check.",

    prerequisites: [
      "A Next.js project (App Router) you can run locally",
      "Node.js and a package manager (npm, pnpm, or yarn) installed",
      "Comfort running a test suite from the command line",
    ],

    setup: {
      instructions:
        "Install Playwright and the axe integration as dev dependencies, then install Playwright's browser binaries.",
      code: {
        language: "bash",
        code: "pnpm add -D @playwright/test @axe-core/playwright\npnpm exec playwright install --with-deps chromium",
      },
    },

    steps: [
      {
        id: "write-a-test-file",
        title: "Write a basic Playwright test",
        instructions:
          "Create a test file that visits a real page in your app. This is the page an accessibility scan will run against.",
        code: {
          filename: "e2e/accessibility.spec.ts",
          language: "typescript",
          code: 'import { expect, test } from "@playwright/test";\n\ntest("homepage loads", async ({ page }) => {\n  await page.goto("/");\n  await expect(page).toHaveTitle(/./);\n});',
        },
      },
      {
        id: "add-an-axe-scan",
        title: "Add an AxeBuilder scan",
        instructions:
          "Import AxeBuilder, run it against the loaded page, and assert there are zero violations. Scoping to wcag2a/wcag2aa/best-practice keeps the scan focused on real, actionable rules.",
        code: {
          filename: "e2e/accessibility.spec.ts",
          language: "typescript",
          code: 'import AxeBuilder from "@axe-core/playwright";\nimport { expect, test } from "@playwright/test";\n\ntest("homepage has no automatically detectable accessibility violations", async ({ page }) => {\n  await page.goto("/");\n\n  const results = await new AxeBuilder({ page })\n    .withTags(["wcag2a", "wcag2aa", "best-practice"])\n    .analyze();\n\n  expect(results.violations).toEqual([]);\n});',
        },
      },
      {
        id: "run-it",
        title: "Run it and read the output",
        instructions:
          "Run the test. A passing scan prints nothing unusual; a failing one lists each violation with the specific element and rule that failed, which is usually enough to fix it directly.",
        code: {
          language: "bash",
          code: "pnpm exec playwright test e2e/accessibility.spec.ts",
        },
      },
    ],

    validation:
      "Run the suite once against your unmodified page — it should pass. Then intentionally break something real (remove an image's alt text, or drop a form label) and run it again — the same test should now fail and name the specific violation. If both of those are true, the scan is doing its job.",

    nextSteps: [
      "Add a scan for every major page template, not just one — a single passing scan doesn't cover pages with different components",
      "Wire the test into CI so an accessibility regression fails the build instead of shipping",
      "Pair automated scans with a real manual pass — automated tools catch roughly a third of real issues; see the Accessibility Checklist playbook for what to check by hand",
    ],

    relatedTechnologySlugs: ["next-js"],
    relatedArticleSlugs: ["accessibility-checklist-for-product-teams"],
  },
];
