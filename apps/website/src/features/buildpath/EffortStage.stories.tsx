import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { EffortStage } from "./EffortStage";

const meta = {
  title: "BuildPath/EffortStage",
  component: EffortStage,
} satisfies Meta<typeof EffortStage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
