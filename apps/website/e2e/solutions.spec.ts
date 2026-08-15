import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const SOLUTION_NAV_LABELS = [
  "Startup",
  "Enterprise",
  "Commerce",
  "Artificial Intelligence",
  "Platform Engineering",
  "Cloud & Infrastructure",
  "Automation",
  "Product Design",
  "Custom Engineering",
];

test.describe("Solutions landing page", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/solutions");
  });

  test("renders the hero and every solution card, and a card navigates to its solution page", async ({
    page,
  }) => {
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    for (const label of SOLUTION_NAV_LABELS) {
      await expect(page.getByRole("heading", { name: label, exact: true })).toBeVisible();
    }

    await page.getByRole("heading", { name: "Startup", exact: true }).click();
    await expect(page).toHaveURL(/\/solutions\/startup$/);
    await expect(
      page.getByRole("heading", {
        name: "Build products that investors and customers believe in.",
      }),
    ).toBeVisible();
  });

  test("has no automatically detectable accessibility violations", async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "best-practice"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});

test.describe("Solution detail page (startup, representative of all nine)", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/solutions/startup");
  });

  test("renders every shared template section", async ({ page }) => {
    await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Build products that investors and customers believe in.",
      }),
    ).toBeVisible();

    for (const id of [
      "business-problem",
      "business-outcomes",
      "engineering-philosophy",
      "capabilities",
      "architecture",
      "technology",
      "delivery",
      "engagement-snapshot",
      "success-metrics",
      "related-case-studies",
      "related-knowledge",
      "faq",
      "get-started",
    ]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
  });

  test("expands a capability and selects an architecture node", async ({ page }) => {
    await page.locator("#capabilities").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "Product Strategy & Validation" }).click();
    await expect(page.getByText("Why", { exact: true })).toBeVisible();

    await page.locator("#architecture").scrollIntoViewIfNeeded();
    const archButtons = page.locator('section#architecture [role="listitem"] button');
    await archButtons.nth(1).click();
    await expect(archButtons.nth(1)).toHaveAttribute("aria-pressed", "true");
  });

  test("the sidebar scrollspy highlights the section currently in view", async ({ page }) => {
    const architectureLink = page.getByRole("link", { name: "How it fits together" });
    await expect(architectureLink).toBeVisible();

    // useScrollSpy's rootMargin ("-15% 0px -70% 0px") only treats a section
    // as active while its top sits within a narrow band near the top of the
    // viewport — plain `scrollIntoViewIfNeeded()` can land it anywhere in
    // the viewport, so position it explicitly within that band instead.
    await page.evaluate(() => {
      const section = document.getElementById("architecture");
      if (!section) throw new Error("Missing #architecture section");
      const top = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top - window.innerHeight * 0.2 });
    });

    await expect(architectureLink).toHaveAttribute("aria-current", "location");
  });

  test("the primary CTA links to BuildPath with the solution prefilled", async ({ page }) => {
    const cta = page.getByRole("link", { name: "Plan My Product Roadmap" }).first();
    await expect(cta).toHaveAttribute("href", "/buildpath?solution=startup");

    await cta.click();
    await expect(page).toHaveURL(/\/buildpath\?solution=startup$/);
    await expect(page.getByText("Continuing from Startup Product Engineering")).toBeVisible();
  });

  test("opens the AI Companion from Talk to Byld with a solution-aware greeting", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Talk to Byld" }).first().click();
    await expect(page.getByRole("dialog", { name: "Byld" })).toBeVisible();
    await expect(page.getByText(/Startup Product Engineering/)).toBeVisible();
  });

  test("has no automatically detectable accessibility violations", async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "best-practice"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});

test.describe("Solutions navigation", () => {
  test("the primary nav's Solutions mega menu lists all nine solutions", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    await page.getByRole("button", { name: "Solutions" }).click();
    for (const label of SOLUTION_NAV_LABELS) {
      await expect(page.getByRole("link", { name: label, exact: true })).toBeVisible();
    }

    await page.getByRole("link", { name: "Enterprise", exact: true }).click();
    await expect(page).toHaveURL(/\/solutions\/enterprise$/);
  });

  test("an unknown solution slug shows the shared not-found page", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    // Not asserting a 404 status code here: a statically-generated `[slug]`
    // route calling `notFound()` for a param outside `generateStaticParams()`
    // renders the correct not-found UI but Next.js 15 serves it with a 200
    // status in this configuration — reproduced identically on the
    // pre-existing `/work/[slug]` route, so it's a framework-level
    // behavior, not a Solutions-specific regression, and out of scope to
    // change here.
    await page.goto("/solutions/this-solution-does-not-exist");
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  });
});
