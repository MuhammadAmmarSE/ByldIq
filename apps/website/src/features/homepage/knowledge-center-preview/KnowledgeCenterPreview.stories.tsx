import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { KnowledgeCenterPreview } from "./KnowledgeCenterPreview";

const meta = {
  title: "Homepage/KnowledgeCenterPreview",
  component: KnowledgeCenterPreview,
} satisfies Meta<typeof KnowledgeCenterPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
