import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/nextjs-vite";

import "../src/app/globals.css";
import { StorybookProviders } from "../src/providers/StorybookProviders";

const preview: Preview = {
  parameters: {
    // The app is App Router only (CLAUDE.md Part 26). Without this,
    // Storybook's Next.js mock provides a Pages Router context, so any
    // component calling `useRouter()` from `next/navigation` throws
    // "invariant expected app router to be mounted".
    nextjs: {
      appDirectory: true,
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // Fail the Storybook test run (`vitest --project=storybook`) on any
      // accessibility violation rather than only surfacing it in the UI.
      test: "error",
    },

    backgrounds: {
      disable: true,
    },
  },

  decorators: [
    (Story) => (
      <StorybookProviders>
        <Story />
      </StorybookProviders>
    ),
    withThemeByClassName({
      themes: { light: "", dark: "dark" },
      defaultTheme: "light",
    }),
  ],
};

export default preview;
