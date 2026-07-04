import { existsSync } from "node:fs";

import { defineConfig, devices } from "@playwright/test";

// See vitest.config.ts for why this exists.
const PRESTAGED_CHROMIUM = "/opt/pw-browsers/chromium";
const chromiumExecutablePath = existsSync(PRESTAGED_CHROMIUM) ? PRESTAGED_CHROMIUM : undefined;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  webServer: {
    command: "pnpm build && pnpm start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: { executablePath: chromiumExecutablePath },
      },
    },
  ],
});
