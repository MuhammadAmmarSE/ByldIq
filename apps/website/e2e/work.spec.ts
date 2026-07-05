import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const CASE_STUDY_COMPANY_NAMES = [
  "Fieldnote",
  "Atlas Logistics",
  "Nova Commerce",
  "Northwind AI",
  "Harborline Cloud",
];

test.describe("Work landing page", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work");
  });

  test("renders the hero, featured work, and every case study, and a card navigates to its story", async ({
    page,
  }) => {
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("searchbox", { name: /search case studies/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Featured work" })).toBeVisible();

    for (const name of CASE_STUDY_COMPANY_NAMES) {
      await expect(page.getByText(name).first()).toBeVisible();
    }

    await page
      .getByRole("link", { name: /From idea to a funded MVP/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/work\/fieldnote-mvp$/);
    await expect(
      page.getByRole("heading", { name: "From idea to a funded MVP in nine weeks." }),
    ).toBeVisible();
  });

  test("filters by industry via the hero's quick filter", async ({ page }) => {
    await page.getByRole("button", { name: "Retail" }).click();
    await expect(page.getByText(/Nova Commerce/i).first()).toBeVisible();
    await expect(page.getByText(/Atlas Logistics/i)).not.toBeVisible();
  });

  test("has no automatically detectable accessibility violations", async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "best-practice"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});

test.describe("Case study detail page (fieldnote-mvp, representative of all five)", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/fieldnote-mvp");
  });

  test("renders every shared template section", async ({ page }) => {
    await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "From idea to a funded MVP in nine weeks." }),
    ).toBeVisible();

    for (const id of [
      "executive-summary",
      "business-challenge",
      "discovery",
      "product-thinking",
      "architecture",
      "technology-decisions",
      "engineering-process",
      "challenges",
      "results",
      "lessons-learned",
      "related-solutions",
      "related-knowledge",
      "faq",
      "get-started",
    ]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
  });

  test("selects an architecture node and expands a technology decision", async ({ page }) => {
    await page.locator("#architecture").scrollIntoViewIfNeeded();
    const archButtons = page.locator('section#architecture [role="listitem"] button');
    await archButtons.nth(1).click();
    await expect(archButtons.nth(1)).toHaveAttribute("aria-pressed", "true");

    await page.locator("#technology-decisions").scrollIntoViewIfNeeded();
    await page.locator("#technology-decisions button[aria-expanded]").first().click();
    await expect(page.getByText("Why", { exact: true })).toBeVisible();
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

  test("the primary CTA links to BuildPath with the case study prefilled", async ({ page }) => {
    const cta = page.getByRole("link", { name: "Plan a similar project" }).first();
    await expect(cta).toHaveAttribute("href", "/buildpath?caseStudy=fieldnote-mvp");

    await cta.click();
    await expect(page).toHaveURL(/\/buildpath\?caseStudy=fieldnote-mvp$/);
    await expect(page.getByText(/Continuing from Fieldnote/)).toBeVisible();
  });

  test("opens the AI Companion from Talk to Byld with a case-study-aware greeting", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Talk to Byld" }).first().click();
    await expect(page.getByRole("dialog", { name: "Byld" })).toBeVisible();
    await expect(page.getByText(/Fieldnote case study/)).toBeVisible();
  });

  test("has no automatically detectable accessibility violations", async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "best-practice"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});

test.describe("Work facet and search routes", () => {
  test("industry facet route preseeds the filter and gives the page its own heading", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/industry/field-services");

    await expect(
      page.getByRole("heading", { name: "Field Services engineering stories." }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Field Services" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(page.getByText(/Fieldnote/i).first()).toBeVisible();
  });

  test("technology facet route preseeds the filter", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/technology/next-js");

    await expect(page.getByRole("heading", { name: "Built with Next.js." })).toBeVisible();
    await expect(page.getByText(/Fieldnote/i).first()).toBeVisible();
  });

  test("business-problem facet route preseeds the filter", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/business-problem/mvp-validation");

    await expect(
      page.getByRole("heading", { name: "MVP Validation engineering stories." }),
    ).toBeVisible();
    await expect(page.getByText(/Fieldnote/i).first()).toBeVisible();
  });

  test("search route prefills the search box from ?q=", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/search?q=Fieldnote");

    await expect(page.getByRole("searchbox", { name: /search case studies/i })).toHaveValue(
      "Fieldnote",
    );
  });

  test("an unknown industry slug shows the shared not-found page", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/industry/this-industry-does-not-exist");
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  });
});

test.describe("Work navigation", () => {
  test("the primary nav's Work mega menu lists every case study by company", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    await page.getByRole("button", { name: "Work", exact: true }).click();
    for (const name of CASE_STUDY_COMPANY_NAMES) {
      await expect(page.getByRole("link", { name, exact: true })).toBeVisible();
    }

    await page.getByRole("link", { name: "Fieldnote", exact: true }).click();
    await expect(page).toHaveURL(/\/work\/fieldnote-mvp$/);
  });

  test("an unknown case study slug shows the shared not-found page", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/work/this-case-study-does-not-exist");
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  });
});
