import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const dirname =
  typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// Some sandboxed dev environments pre-stage a Chromium build at this fixed
// path instead of allowing `playwright install` to download one that
// matches the pinned Playwright version. Use it when present; otherwise
// fall back to Playwright's normal resolution (the common case in CI and
// on developer machines).
const PRESTAGED_CHROMIUM = "/opt/pw-browsers/chromium";
const chromiumExecutablePath = existsSync(PRESTAGED_CHROMIUM) ? PRESTAGED_CHROMIUM : undefined;

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  resolve: {
    alias: {
      "@": path.join(dirname, "src"),
    },
  },
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
    projects: [
      {
        resolve: {
          alias: {
            "@": path.join(dirname, "src"),
          },
        },
        plugins: [react()],
        test: {
          name: "unit",
          environment: "jsdom",
          setupFiles: ["./vitest.setup.ts"],
          include: ["src/**/*.test.{ts,tsx}"],
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({ configDir: path.join(dirname, ".storybook") }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({
              launchOptions: { executablePath: chromiumExecutablePath },
            }),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
