import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CodeBlock } from "./CodeBlock";

const meta = {
  title: "Components/CodeBlock",
  component: CodeBlock,
} satisfies Meta<typeof CodeBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    code: [
      "export function greet(name: string) {",
      "  // Say hello",
      '  return "Hello, " + name + "!";',
      "}",
    ].join("\n"),
    language: "typescript",
    filename: "greet.ts",
  },
};

export const WithHighlightedLine: Story = {
  args: {
    code: "const config = {\n  retries: 3,\n  timeout: 5000,\n};",
    language: "typescript",
    filename: "config.ts",
    highlightLines: [2],
  },
};

export const Bash: Story = {
  args: {
    code: "# Install dependencies\npnpm install\npnpm run dev",
    language: "bash",
  },
};

export const Collapsible: Story = {
  args: {
    code: Array.from({ length: 24 }, (_, index) => `console.log(${index + 1});`).join("\n"),
    language: "typescript",
    filename: "long-file.ts",
  },
};
