import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { KnowledgeBookmarkButton } from "./KnowledgeBookmarkButton";

const meta = {
  title: "Knowledge/KnowledgeBookmarkButton",
  component: KnowledgeBookmarkButton,
  args: { slug: "validating-an-mvp" },
} satisfies Meta<typeof KnowledgeBookmarkButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
