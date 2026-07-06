import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { KnowledgeSidebar } from "./KnowledgeSidebar";

const meta = {
  title: "Knowledge/KnowledgeSidebar",
  component: KnowledgeSidebar,
} satisfies Meta<typeof KnowledgeSidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
