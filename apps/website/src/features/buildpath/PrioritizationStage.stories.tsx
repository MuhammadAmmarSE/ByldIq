import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PrioritizationStage } from "./PrioritizationStage";

const meta = {
  title: "BuildPath/PrioritizationStage",
  component: PrioritizationStage,
} satisfies Meta<typeof PrioritizationStage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
