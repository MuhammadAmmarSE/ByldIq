import { expect, test } from "@playwright/test";

test("shows the custom not-found page for unknown routes, and recovers to the homepage", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });

  const response = await page.goto("/this-route-does-not-exist");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();

  await page.getByRole("link", { name: "Back home" }).click();
  await expect(page.getByRole("heading", { name: "What are you building?" })).toBeVisible();
});
