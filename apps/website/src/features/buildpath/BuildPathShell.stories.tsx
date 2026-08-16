import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { BuildPathShell } from "./BuildPathShell";

const meta = {
  title: "BuildPath/BuildPathShell",
  component: BuildPathShell,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof BuildPathShell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Direct: Story = {
  args: {
    entryContext: null,
    prefillProjectTypes: [],
  },
};

export const FromSolution: Story = {
  args: {
    entryContext: { source: "solution", label: "Startup Product Engineering" },
    prefillProjectTypes: ["MVP", "New Product"],
  },
};
