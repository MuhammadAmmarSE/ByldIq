import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AiOpportunitiesStage } from "./AiOpportunitiesStage";

const meta = {
  title: "BuildPath/AiOpportunitiesStage",
  component: AiOpportunitiesStage,
} satisfies Meta<typeof AiOpportunitiesStage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
