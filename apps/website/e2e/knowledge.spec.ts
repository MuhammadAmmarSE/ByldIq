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
  test("lists all three real playbooks and states the honest scope", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/knowledge/playbooks");

    await expect(page.getByRole("heading", { name: "Playbooks", exact: true })).toBeVisible();
    await expect(
      page.getByRole("link", { name: /A Practical Accessibility Checklist for Product Teams/ }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /The Architecture Review Playbook/ }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /The Production Readiness Playbook/ }),
    ).toBeVisible();
    await expect(page.getByText(/3 practical playbooks are published so far/)).toBeVisible();
  });

  test("a card links to the dedicated checklist view, not the full article", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/knowledge/playbooks");

    await page
      .getByRole("link", { name: /The Architecture Review Playbook/ })
      .first()
      .click();
    await expect(page).toHaveURL(/\/knowledge\/playbooks\/architecture-review-playbook$/);
    await expect(
      page.getByRole("heading", { name: "The Architecture Review Playbook" }),
    ).toBeVisible();
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

test.describe("Playbook detail page (dedicated checklist)", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/knowledge/playbooks/architecture-review-playbook");
  });

  test("renders steps and tracks checklist progress", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "The Architecture Review Playbook" }),
    ).toBeVisible();
    await expect(page.getByText("0 of 9 checked")).toBeVisible();

    const [firstItem] = await page
      .getByRole("button", { name: "The problem is stated in one paragraph, in plain language" })
      .all();
    if (!firstItem) throw new Error("Expected the first checklist item to be present");
    await firstItem.click();

    await expect(firstItem).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByText("1 of 9 checked")).toBeVisible();
  });

  test("links back to the full educational article", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Read the full guide" })).toHaveAttribute(
      "href",
      "/knowledge/architecture-review-playbook",
    );
  });

  test("has no automatically detectable accessibility violations", async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "best-practice"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});

test.describe("Tutorials", () => {
  test("lists the real tutorial and states the honest scope", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/knowledge/tutorials");

    await expect(page.getByRole("heading", { name: "All tutorials" })).toBeVisible();
    await expect(page.getByText(/One hands-on tutorial is published so far/)).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Add Automated Accessibility Testing to a Next\.js App/ }),
    ).toBeVisible();
  });

  test("detail page renders prerequisites, setup, steps with code, validation, and next steps", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/knowledge/tutorials/automated-accessibility-testing-with-axe");

    await expect(
      page.getByRole("heading", { name: "Add Automated Accessibility Testing to a Next.js App" }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Prerequisites" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Setup" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Step 1: Write a basic Playwright test" }),
    ).toBeVisible();
    await expect(page.getByText("pnpm add -D @playwright/test @axe-core/playwright")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Validation" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Next steps" })).toBeVisible();

    await expect(
      page.getByRole("link", { name: "Plan a similar build with BuildPath" }),
    ).toHaveAttribute("href", "/buildpath?tutorial=automated-accessibility-testing-with-axe");
  });

  test("a code block's copy button copies the sample to the clipboard", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/knowledge/tutorials/automated-accessibility-testing-with-axe");

    await page.getByRole("button", { name: "Copy" }).first().click();
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied).toContain("pnpm add -D @playwright/test @axe-core/playwright");
  });

  test("has no automatically detectable accessibility violations", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/knowledge/tutorials/automated-accessibility-testing-with-axe");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "best-practice"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});

test.describe("Honest content-type placeholders", () => {
  for (const path of ["/knowledge/whitepapers", "/knowledge/videos"]) {
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

test.describe("Search intelligence", () => {
  test("recognizes an alias and ranks the matching article first", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/knowledge");

    await page.getByRole("searchbox", { name: /search the knowledge center/i }).fill("postgres");
    await expect(
      page.getByRole("link", { name: /The Architecture Review Playbook/ }).first(),
    ).toBeVisible();
  });

  test("a zero-result query surfaces a real Technology Explorer suggestion, never a dead end", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/knowledge");

    await page.getByRole("searchbox", { name: /search the knowledge center/i }).fill("mongodb");
    await expect(page.getByText(/No articles match that search or category yet/)).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Explore MongoDB in Technology Explorer" }),
    ).toHaveAttribute("href", "/technology/mongodb");
  });
});

test.describe("Ask Byld to summarize", () => {
  test("switching modes shows a different, real summary derived from the article", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/knowledge/validating-an-mvp");

    await expect(page.getByRole("heading", { name: "Ask Byld to summarize" })).toBeVisible();
    const executiveTab = page.getByRole("tab", { name: "Executive summary" });
    await executiveTab.click();
    await expect(executiveTab).toHaveAttribute("aria-selected", "true");

    const beginnerTab = page.getByRole("tab", { name: "Explain it simply" });
    await beginnerTab.click();
    await expect(beginnerTab).toHaveAttribute("aria-selected", "true");
  });
});

test.describe("Reading progress and sharing", () => {
  test("a share triggers the clipboard fallback with a confirmation toast", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.emulateMedia({ reducedMotion: "reduce" });
    // The Web Share API isn't available in the headless test browser, so
    // ShareButton takes its documented clipboard-copy fallback path.
    await page.goto("/knowledge/validating-an-mvp");

    await page.getByRole("button", { name: "Share" }).click();
    await expect(page.getByText("Link copied", { exact: true })).toBeVisible();
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied).toBe("http://localhost:3000/knowledge/validating-an-mvp");
  });

  test("revisiting an article with saved partial progress offers to jump back in", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/knowledge/validating-an-mvp");
    // Seed reading progress the same way KnowledgeArticleHero's unmount effect
    // does, rather than actually scrolling and unmounting in the test.
    await page.evaluate(() => {
      const raw = localStorage.getItem("byld-iq-app-store");
      const state = raw ? JSON.parse(raw) : { state: {}, version: 0 };
      state.state.readingProgressBySlug = { "validating-an-mvp": 40 };
      localStorage.setItem("byld-iq-app-store", JSON.stringify(state));
    });
    await page.reload();

    await expect(page.getByText("Welcome back")).toBeVisible();
    await expect(page.getByText("You were 40% through this article.")).toBeVisible();
    await page.getByRole("button", { name: "Dismiss" }).click();
    await expect(page.getByText("Welcome back")).not.toBeVisible();
  });
});

test.describe("Knowledge Center newsletter", () => {
  test("submitting the newsletter form shows a confirmation", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/knowledge");

    await page.getByLabel("Email address").fill("founder@example.com");
    await page.getByRole("button", { name: "Subscribe" }).click();
    await expect(page.getByText("You're subscribed.")).toBeVisible();
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
