import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig, globalIgnores } from "eslint/config";
import storybook from "eslint-plugin-storybook";
import tseslint from "typescript-eslint";

// eslint-config-next ships eslintrc-format shared configs (which already
// register eslint-plugin-jsx-a11y); FlatCompat bridges them into ESLint 9's
// flat config system.
//
// This file lives at the repo root rather than inside apps/website because
// ESLint's flat config doesn't search parent directories for a config file —
// centralizing it here also matches CLAUDE.md Part 25 ("Configuration
// Files: Centralized ... Avoid duplicate configuration").
const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const eslintConfig = defineConfig([
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...tseslint.configs.strict,
  ...storybook.configs["flat/recommended"],
  {
    // Tells eslint-plugin-next where the Next.js app actually lives, since
    // it isn't at the repo root in this monorepo layout.
    settings: {
      next: {
        rootDir: "apps/website",
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // eslint-config-next ships these as "warn" — a11y failures should block CI.
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/role-supports-aria-props": "error",
    },
  },
  {
    files: ["**/*.test.{ts,tsx}", "**/*.stories.{ts,tsx}", "**/*.config.{ts,mts,mjs}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  globalIgnores([
    // Unlike .gitignore, these globs aren't anchored/recursive by default —
    // `**/` is required to match inside apps/website (and any future app).
    "**/.next/**",
    "**/out/**",
    "**/build/**",
    "**/next-env.d.ts",
    "**/storybook-static/**",
    "**/.content-collections/**",
    "**/coverage/**",
    "**/playwright-report/**",
  ]),
]);

export default eslintConfig;
