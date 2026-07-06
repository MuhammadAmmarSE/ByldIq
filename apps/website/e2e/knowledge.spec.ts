import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Knowledge Center landing page", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/knowledge");
  });

  test("renders the hero, featured guide, and every article", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      page.getByRole("searchbox", { name: /search the knowledge center/i }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Featured guide" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "All articles" })).toBeVisible();

    await expect(
      page.getByRole("link", { name: /How to Validate an MVP Before Writing Code/ }).first(),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /RAG vs Fine-Tuning/ }).first()).toBeVisible();
  });

  test("filters by category via the hero's quick filter", async ({ page }) => {
    await page.getByRole("button", { name: "AI" }).click();
    await expect(page.getByRole("link", { name: /RAG vs Fine-Tuning/ }).first()).toBeVisible();
    await expect(
      page.getByRole("link", { name: /How to Validate an MVP Before Writing Code/ }),
    ).not.toBeVisible();
  });

  test("links to Learning Paths and Playbooks", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Explore Learning Paths" })).toHaveAttribute(
      "href",
      "/knowledge/learning-paths",
    );
    await expect(page.getByRole("link", { name: "Explore Playbooks" })).toHaveAttribute(
      "href",
      "/knowledge/playbooks",
    );
  });

  test("a card navigates to its article page", async ({ page }) => {
    await page
      .getByRole("link", { name: /How to Validate an MVP Before Writing Code/ })
      .first()
      .click();
    await expect(page).toHaveURL(/\/knowledge\/validating-an-mvp$/);
    await expect(
      page.getByRole("heading", { name: "How to Validate an MVP Before Writing Code" }),
    ).toBeVisible();
  });

  test("has no automatically detectable accessibility violations", async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "best-practice"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});

test.describe("Knowledge article page (validating-an-mvp, representative of all articles)", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/knowledge/validating-an-mvp");
  });

  test("renders every shared template section", async ({ page }) => {
    await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "How to Validate an MVP Before Writing Code" }),
    ).toBeVisible();

    for (const id of [
      "who-this-is-for",
      "what-youll-learn",
      "problem",
      "why-it-matters",
      "business-and-engineering-context",
      "real-world-relevance",
      "core-concepts",
      "interactive-learning",
      "real-examples",
      "common-mistakes",
      "related-technologies",
      "related-case-studies",
      "related-learning",
      "get-started",
    ]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
  });

  test("selects a walkthrough step", async ({ page }) => {
    await page.locator("#interactive-learning").scrollIntoViewIfNeeded();
    const step = page.getByRole("button", { name: "Design the cheapest real test" });
    await step.click();
    await expect(step).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByText(/a landing page with a real payment button/)).toBeVisible();
  });

  test("toggles the bookmark button", async ({ page }) => {
    const bookmarkButton = page.getByRole("button", { name: "Bookmark" });
    await bookmarkButton.click();
    await expect(page.getByRole("button", { name: "Bookmarked" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  test("the sidebar scrollspy highlights the section currently in view", async ({ page }) => {
    const commonMistakesLink = page.getByRole("link", { name: "Common mistakes" });
    await expect(commonMistakesLink).toBeVisible();

    await page.evaluate(() => {
      const section = document.getElementById("common-mistakes");
      if (!section) throw new Error("Missing #common-mistakes section");
      const top = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top - window.innerHeight * 0.2 });
    });

    await expect(commonMistakesLink).toHaveAttribute("aria-current", "location");
  });

  test("the primary CTA links to BuildPath with the article prefilled", async ({ page }) => {
    const cta = page.getByRole("link", { name: "Plan Your Roadmap" }).first();
    await expect(cta).toHaveAttribute("href", "/buildpath?article=validating-an-mvp");

    await cta.click();
    await expect(page).toHaveURL(/\/buildpath\?article=validating-an-mvp$/);
    await expect(page.getByText(/Continuing from/)).toBeVisible();
  });

  test("opens the AI Companion from Talk to Byld with an article-aware greeting", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Talk to Byld" }).first().click();
    await expect(page.getByRole("dialog", { name: "Byld" })).toBeVisible();
    await expect(
      page.getByText(/Looks like you're exploring How to Validate an MVP Before Writing Code/),
    ).toBeVisible();
  });

  test("has no automatically detectable accessibility violations", async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "best-practice"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});

test.describe("Learning Paths", () => {
  test("landing page lists the real path and links to its detail page", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/knowledge/learning-paths");

    await expect(page.getByRole("heading", { name: "Learning Paths" })).toBeVisible();
    const pathLink = page.getByRole("link", { name: "Startup Founder" });
    await expect(pathLink).toBeVisible();

    await pathLink.click();
    await expect(page).toHaveURL(/\/knowledge\/learning-paths\/startup-founder$/);
  });

  test("detail page tracks progress as steps are completed", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/knowledge/learning-paths/startup-founder");

    await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
    await expect(page.getByText("0 of 5 complete")).toBeVisible();

    const [firstCheckbox] = await page.getByRole("checkbox", { name: "Complete" }).all();
    if (!firstCheckbox) throw new Error("Expected at least one checkbox");
    await firstCheckbox.click();

    await expect(page.getByText("1 of 5 complete")).toBeVisible();
  });

  test("Start this path links to the first article", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/knowledge/learning-paths/startup-founder");

    await expect(page.getByRole("link", { name: "Start this path" })).toHaveAttribute(
      "href",
      "/knowledge/validating-an-mvp",
    );
  });

  test("has no automatically detectable accessibility violations", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/knowledge/learning-paths/startup-founder");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "best-practice"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});

test.describe("Playbooks", () => {
  test("lists the one real playbook and states the honest scope", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/knowledge/playbooks");

    await expect(page.getByRole("heading", { name: "Playbooks", exact: true })).toBeVisible();
    await expect(
      page.getByRole("link", { name: /A Practical Accessibility Checklist for Product Teams/ }),
    ).toBeVisible();
    await expect(page.getByText(/One practical playbook is published so far/)).toBeVisible();
  });

  test("has no automatically detectable accessibility violations", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/knowledge/playbooks");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "best-practice"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});

test.describe("Honest content-type placeholders", () => {
  for (const path of ["/knowledge/whitepapers", "/knowledge/videos", "/knowledge/tutorials"]) {
    test(`${path} states the content gap and links to real content`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);

      await expect(page.getByText(/doesn't have any/)).toBeVisible();
      await expect(page.getByRole("link", { name: "Browse all articles" })).toHaveAttribute(
        "href",
        "/knowledge",
      );
    });
  }

  test("/knowledge/videos has no automatically detectable accessibility violations", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/knowledge/videos");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "best-practice"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});

test.describe("Knowledge category and search routes", () => {
  test("category route preseeds the filter and gives the page its own heading", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/knowledge/category/ai");

    await expect(page.getByRole("heading", { name: "AI guides." })).toBeVisible();
    await expect(page.getByRole("button", { name: "AI" })).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByRole("link", { name: /RAG vs Fine-Tuning/ }).first()).toBeVisible();
  });

  test("search route prefills the search box from ?q=", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/knowledge/search?q=MVP");

    await expect(page.getByRole("searchbox", { name: /search the knowledge center/i })).toHaveValue(
      "MVP",
    );
  });

  test("an unknown category slug shows the shared not-found page", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/knowledge/category/this-category-does-not-exist");
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  });
});

test.describe("Knowledge navigation", () => {
  test("the primary nav's Knowledge mega menu lists categories, Learning Paths, and Playbooks", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    await page.getByRole("button", { name: "Knowledge", exact: true }).click();
    await expect(page.getByRole("link", { name: "AI", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Learning Paths" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Playbooks" })).toBeVisible();

    await page.getByRole("link", { name: "Learning Paths" }).click();
    await expect(page).toHaveURL(/\/knowledge\/learning-paths$/);
  });

  test("an unknown article slug shows the shared not-found page", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/knowledge/this-article-does-not-exist");
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  });
});
