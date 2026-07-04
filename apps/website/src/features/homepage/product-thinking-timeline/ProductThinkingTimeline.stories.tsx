import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ProductThinkingTimeline } from "./ProductThinkingTimeline";

const meta = {
  title: "Homepage/ProductThinkingTimeline",
  component: ProductThinkingTimeline,
} satisfies Meta<typeof ProductThinkingTimeline>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
