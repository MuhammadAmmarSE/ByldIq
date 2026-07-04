import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("boots the foundation placeholder without console errors", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });

  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Engineering foundation" })).toBeVisible();
  expect(consoleErrors).toEqual([]);
});

test("theme toggle switches the document class", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "dark", exact: true }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);

  await page.getByRole("button", { name: "light", exact: true }).click();
  await expect(page.locator("html")).not.toHaveClass(/dark/);
});

test("journey selection updates the Zustand store", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "startup", exact: true }).click();
  await expect(page.getByText("Selected: startup")).toBeVisible();
});

test("has no automatically detectable accessibility violations", async ({ page }) => {
  await page.goto("/");

  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();

  expect(results.violations).toEqual([]);
});

test("shows the custom not-found page for unknown routes", async ({ page }) => {
  const response = await page.goto("/this-route-does-not-exist");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  await page.getByRole("link", { name: "Back home" }).click();
  await expect(page.getByRole("heading", { name: "Engineering foundation" })).toBeVisible();
});
