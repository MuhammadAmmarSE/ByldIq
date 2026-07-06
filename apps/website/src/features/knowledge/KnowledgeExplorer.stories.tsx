import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { KnowledgeExplorer } from "./KnowledgeExplorer";

const meta = {
  title: "Knowledge/KnowledgeExplorer",
  component: KnowledgeExplorer,
} satisfies Meta<typeof KnowledgeExplorer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
