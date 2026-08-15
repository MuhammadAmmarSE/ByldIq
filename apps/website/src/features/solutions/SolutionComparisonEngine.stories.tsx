import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SolutionComparisonEngine } from "./SolutionComparisonEngine";

const meta = {
  title: "Solutions/SolutionComparisonEngine",
  component: SolutionComparisonEngine,
} satisfies Meta<typeof SolutionComparisonEngine>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
