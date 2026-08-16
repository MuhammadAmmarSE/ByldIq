import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SummaryStage } from "./SummaryStage";

const meta = {
  title: "BuildPath/SummaryStage",
  component: SummaryStage,
} satisfies Meta<typeof SummaryStage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
