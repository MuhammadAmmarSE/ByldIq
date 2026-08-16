import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("About page", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/about");
  });

  test("renders the hero and every section in the sidebar", async ({ page }) => {
    await expect(
      page.getByRole("heading", { level: 1, name: "We build software with intention." }),
    ).toBeVisible();

    const sidebar = page.getByRole("navigation", { name: "On this page" });
    for (const label of [
      "Our philosophy",
      "How we work, stage by stage",
      "Engineering standards",
      "Design + engineering",
      "Team",
      "Culture",
      "How we work with clients",
      "Transparency",
      "Technology philosophy",
      "AI philosophy",
      "What's next",
      "Explore further",
    ]) {
      await expect(sidebar.getByRole("link", { name: label })).toBeVisible();
    }
  });

  test("switches stages in the Byld IQ Approach timeline", async ({ page }) => {
    await page.getByRole("tab", { name: "Explore", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "Replace opinion with evidence." }),
    ).toBeVisible();
  });

  test("the sidebar scrollspy highlights the section currently in view", async ({ page }) => {
    const cultureLink = page.getByRole("link", { name: "Culture" });
    await expect(cultureLink).toBeVisible();

    // useScrollSpy's rootMargin only treats a section as active while its
    // top sits within a narrow band near the top of the viewport.
    await page.evaluate(() => {
      const section = document.getElementById("culture");
      if (!section) throw new Error("Missing #culture section");
      const top = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top - window.innerHeight * 0.2 });
    });

    await expect(cultureLink).toHaveAttribute("aria-current", "location");
  });

  test("does not fabricate team members", async ({ page }) => {
    await page.locator("#team").scrollIntoViewIfNeeded();
    await expect(
      page.getByText("Individual team and leadership profiles aren't published on this page yet."),
    ).toBeVisible();
  });

  test("opens the AI Companion from Talk to Byld with an About-aware greeting", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Talk to Byld" }).click();
    await expect(page.getByRole("dialog", { name: "Byld" })).toBeVisible();
    await expect(page.getByText(/About page/)).toBeVisible();
  });

  test("the final CTA links to BuildPath, Work, and Knowledge", async ({ page }) => {
    await page.locator("#get-started").scrollIntoViewIfNeeded();

    await expect(page.getByRole("link", { name: /I have an idea/ })).toHaveAttribute(
      "href",
      "/buildpath",
    );
    await expect(page.getByRole("link", { name: /I want to see your work/ })).toHaveAttribute(
      "href",
      "/work",
    );
    await expect(page.getByRole("link", { name: /I want to learn/ })).toHaveAttribute(
      "href",
      "/knowledge",
    );
  });

  test("links to the real Technology Explorer", async ({ page }) => {
    await page.locator("#technology-philosophy").scrollIntoViewIfNeeded();
    await expect(page.getByRole("link", { name: "Explore Technology Decisions" })).toHaveAttribute(
      "href",
      "/technology",
    );
  });

  test("has no automatically detectable accessibility violations", async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "best-practice"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});

test.describe("About navigation", () => {
  test("the primary nav includes a link to About", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "About" }),
    ).toHaveAttribute("href", "/about");
  });
});
