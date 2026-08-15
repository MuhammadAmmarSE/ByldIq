import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { EngagementModelsSection } from "./EngagementModelsSection";

const meta = {
  title: "Solutions/EngagementModelsSection",
  component: EngagementModelsSection,
} satisfies Meta<typeof EngagementModelsSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
