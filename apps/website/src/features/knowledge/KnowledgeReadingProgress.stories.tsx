import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { KnowledgeReadingProgress } from "./KnowledgeReadingProgress";

const meta = {
  title: "Knowledge/KnowledgeReadingProgress",
  component: KnowledgeReadingProgress,
} satisfies Meta<typeof KnowledgeReadingProgress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
