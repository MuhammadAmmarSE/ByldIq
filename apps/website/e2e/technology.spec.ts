import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const TECHNOLOGY_NAMES = [
  "Next.js",
  "Remix",
  "PostgreSQL",
  "MongoDB",
  "Supabase",
  "Kubernetes",
  "Terraform",
  "Shopify Plus",
  "OpenAI",
  "LangChain",
  "React Native",
];

test.describe("Technology landing page", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/technology");
  });

  test("renders the hero and every technology card, and a card navigates to its page", async ({
    page,
  }) => {
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("searchbox", { name: /search technologies/i })).toBeVisible();

    for (const name of TECHNOLOGY_NAMES) {
      await expect(page.getByRole("link", { name, exact: true }).first()).toBeVisible();
    }

    await page.getByRole("link", { name: "Next.js", exact: true }).first().click();
    await expect(page).toHaveURL(/\/technology\/next-js$/);
    await expect(page.getByRole("heading", { name: "Next.js", exact: true })).toBeVisible();
  });

  test("filters by category via the hero's quick filter", async ({ page }) => {
    await page.getByRole("button", { name: "Databases" }).click();
    await expect(page.getByRole("link", { name: "PostgreSQL", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "MongoDB", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Next.js", exact: true })).not.toBeVisible();
  });

  test("links to popular comparisons and the decision framework", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Next.js vs Remix" })).toHaveAttribute(
      "href",
      "/technology/compare?a=next-js&b=remix",
    );
    await expect(page.getByRole("link", { name: "Use the decision framework" })).toHaveAttribute(
      "href",
      "/technology/decision-framework",
    );
  });

  test("has no automatically detectable accessibility violations", async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "best-practice"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});

test.describe("Technology detail page (next-js, representative of all eleven)", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/technology/next-js");
  });

  test("renders every shared template section", async ({ page }) => {
    await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Next.js", exact: true })).toBeVisible();

    for (const id of [
      "business-problem",
      "why-organizations-adopt",
      "business-and-engineering-fit",
      "strengths",
      "weaknesses",
      "trade-off-explorer",
      "architecture",
      "performance",
      "security",
      "accessibility",
      "scalability",
      "cost-analysis",
      "faq",
      "get-started",
    ]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
  });

  test("switches trade-off explorer tabs and selects an architecture node", async ({ page }) => {
    await page.locator("#trade-off-explorer").scrollIntoViewIfNeeded();
    await page.getByRole("tab", { name: "Avoid when" }).click();
    await expect(page.getByRole("tabpanel")).toBeVisible();

    await page.locator("#architecture").scrollIntoViewIfNeeded();
    const archButtons = page.locator('section#architecture [role="listitem"] button');
    await archButtons.nth(1).click();
    await expect(archButtons.nth(1)).toHaveAttribute("aria-pressed", "true");
  });

  test("expands an FAQ question", async ({ page }) => {
    await page.locator("#faq").scrollIntoViewIfNeeded();
    await page.locator("#faq button[aria-expanded]").first().click();
    await expect(page.locator("#faq button[aria-expanded='true']").first()).toBeVisible();
  });

  test("the sidebar scrollspy highlights the section currently in view", async ({ page }) => {
    const architectureLink = page.getByRole("link", { name: "Where it fits in a system" });
    await expect(architectureLink).toBeVisible();

    // useScrollSpy's rootMargin only treats a section as active while its
    // top sits within a narrow band near the top of the viewport.
    await page.evaluate(() => {
      const section = document.getElementById("architecture");
      if (!section) throw new Error("Missing #architecture section");
      const top = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top - window.innerHeight * 0.2 });
    });

    await expect(architectureLink).toHaveAttribute("aria-current", "location");
  });

  test("the primary CTA links to BuildPath with the technology prefilled", async ({ page }) => {
    const cta = page.getByRole("link", { name: "Plan Your Roadmap" }).first();
    await expect(cta).toHaveAttribute("href", "/buildpath?technology=next-js");

    await cta.click();
    await expect(page).toHaveURL(/\/buildpath\?technology=next-js$/);
    await expect(page.getByText("Continuing from Next.js")).toBeVisible();
  });

  test("opens the AI Companion from Talk to Byld with a technology-aware greeting", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Talk to Byld" }).first().click();
    await expect(page.getByRole("dialog", { name: "Byld" })).toBeVisible();
    await expect(page.getByText(/Looks like you're exploring Next\.js/)).toBeVisible();
  });

  test("has no automatically detectable accessibility violations", async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "best-practice"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});

test.describe("Comparison Engine", () => {
  test("compares the default pair and switches to a popular comparison", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/technology/compare");

    const table = page.getByRole("table");
    await expect(table.getByRole("link", { name: "Next.js" })).toBeVisible();
    await expect(table.getByRole("link", { name: "Remix" })).toBeVisible();

    await page.getByRole("button", { name: "PostgreSQL vs MongoDB" }).click();
    await expect(table.getByRole("link", { name: "PostgreSQL" })).toBeVisible();
    await expect(table.getByRole("link", { name: "MongoDB" })).toBeVisible();
  });

  test("deep-links a specific comparison via query params", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/technology/compare?a=postgresql&b=mongodb");

    const table = page.getByRole("table");
    await expect(table.getByRole("link", { name: "PostgreSQL" })).toBeVisible();
    await expect(table.getByRole("link", { name: "MongoDB" })).toBeVisible();
  });

  test("has no automatically detectable accessibility violations", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/technology/compare");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "best-practice"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});

test.describe("Decision Framework", () => {
  test("narrows to real candidates after both questions are answered", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/technology/decision-framework");

    await page.getByRole("button", { name: "Databases" }).click();
    await page.getByRole("button", { name: "Cost & budget" }).click();

    await expect(page.getByRole("link", { name: "PostgreSQL" })).toBeVisible();
    await expect(page.getByRole("link", { name: "MongoDB" })).toBeVisible();
  });

  test("has no automatically detectable accessibility violations", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/technology/decision-framework");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "best-practice"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});

test.describe("Technology category and search routes", () => {
  test("category route preseeds the filter and gives the page its own heading", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/technology/category/databases");

    await expect(
      page.getByRole("heading", { name: "Databases technology decisions." }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Databases" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(page.getByRole("link", { name: "PostgreSQL", exact: true })).toBeVisible();
  });

  test("search route prefills the search box from ?q=", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/technology/search?q=Kubernetes");

    await expect(page.getByRole("searchbox", { name: /search technologies/i })).toHaveValue(
      "Kubernetes",
    );
  });

  test("an unknown category slug shows the shared not-found page", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/technology/category/this-category-does-not-exist");
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  });
});

test.describe("Technology navigation", () => {
  test("the primary nav's Technology mega menu lists every technology", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    await page.getByRole("button", { name: "Technology", exact: true }).click();
    // Scoped to the mega menu panel, not just any link with this name — the
    // homepage's own Technology Ecosystem section (Milestone 9) renders the
    // same technology names, so an unscoped locator is ambiguous.
    const technologyMenu = page.getByLabel("Technology menu");
    for (const name of TECHNOLOGY_NAMES) {
      await expect(technologyMenu.getByRole("link", { name, exact: true })).toBeVisible();
    }

    await technologyMenu.getByRole("link", { name: "Next.js", exact: true }).click();
    await expect(page).toHaveURL(/\/technology\/next-js$/);
  });

  test("an unknown technology slug shows the shared not-found page", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/technology/this-technology-does-not-exist");
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  });
});
