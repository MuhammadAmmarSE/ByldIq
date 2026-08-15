import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const SECTION_IDS = [
  "journey-selection",
  "adaptive-hero",
  "problem-statement",
  "what-we-build",
  "technology-ecosystem",
  "product-thinking",
  "proof-engine",
  "social-proof",
  "product-showcase",
  "engineering-excellence",
  "ai-companion-highlight",
  "buildpath-preview",
  "knowledge-center",
  "conversion-experience",
];

/**
 * Most specs don't care about the Arrival Experience itself (Phase 1 has
 * its own coverage) — they care about the real homepage underneath it.
 * `prefers-reduced-motion` is the documented way to skip it entirely
 * (CLAUDE.md Part 9: "Reduced Motion: 0 seconds"), so every spec but the
 * dedicated arrival test emulates it up front.
 */
async function gotoHomepageSkippingIntro(page: Page) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
}

/** Scrolls through every section, triggering each one's scroll-in-view `Reveal` entrance. */
async function scrollThroughEverySection(page: Page) {
  for (const id of SECTION_IDS) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
  }
}

test.describe("Arrival Experience", () => {
  test("plays the intro, then lets a visitor skip straight to the homepage", async ({ page }) => {
    await page.goto("/");

    const skipButton = page.getByRole("button", { name: "Skip intro" });
    await expect(skipButton).toBeVisible();
    await skipButton.click();

    await expect(page.getByRole("heading", { name: "What are you building?" })).toBeVisible();
  });
});

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await gotoHomepageSkippingIntro(page);
  });

  test("boots without console errors and renders every module in order", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });

    await scrollThroughEverySection(page);
    for (const id of SECTION_IDS) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }

    expect(consoleErrors).toEqual([]);
  });

  test("selecting a journey personalizes the hero instantly", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Engineer products that create measurable value." }),
    ).toBeVisible();

    await page.getByRole("radio", { name: "Startup" }).click();

    await expect(
      page.getByRole("heading", { name: "Build products investors believe in." }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Change journey" })).toBeVisible();
  });

  test("opens the Byld AI Companion from the floating trigger", async ({ page }) => {
    await page.getByRole("button", { name: "Ask Byld", exact: true }).click();

    await expect(page.getByRole("dialog", { name: "Byld" })).toBeVisible();
    await expect(page.getByLabel("Message Byld")).toBeVisible();
  });

  test("switches theme without a hydration flash", async ({ page }) => {
    await page.getByRole("button", { name: "Switch to dark theme" }).click();
    await expect(page.locator("html")).toHaveClass(/dark/);

    await page.getByRole("button", { name: "Switch to light theme" }).click();
    await expect(page.locator("html")).not.toHaveClass(/dark/);
  });

  test("has no automatically detectable accessibility violations", async ({ page }) => {
    // Journey Selection's cards and the hero's staggered content both fade
    // in on load (CLAUDE.md Part 6: reduced motion "replaces movement with
    // opacity," it doesn't remove the fade outright) — scanning before
    // those settle catches a genuinely transient, sub-second low-contrast
    // frame rather than a real defect. The hero's trust indicators are the
    // last item in its stagger sequence, so wait for those specifically —
    // on the animated wrapper itself, since a child's own computed
    // `opacity` doesn't reflect an ancestor's animated opacity.
    const trustIndicators = page.getByText("Long-Term Partnership").locator("xpath=..");
    await expect(trustIndicators).toHaveCSS("opacity", "1");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "best-practice"])
      .analyze();

    expect(results.violations).toEqual([]);
  });
});
