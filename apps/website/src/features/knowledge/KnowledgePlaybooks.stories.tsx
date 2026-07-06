import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { KnowledgePlaybooks } from "./KnowledgePlaybooks";

const meta = {
  title: "Knowledge/KnowledgePlaybooks",
  component: KnowledgePlaybooks,
} satisfies Meta<typeof KnowledgePlaybooks>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
