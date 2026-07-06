import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { KnowledgeContentTypePlaceholder } from "./KnowledgeContentTypePlaceholder";

const meta = {
  title: "Knowledge/KnowledgeContentTypePlaceholder",
  component: KnowledgeContentTypePlaceholder,
} satisfies Meta<typeof KnowledgeContentTypePlaceholder>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Whitepapers: Story = {
  args: {
    contentTypeLabel: "whitepapers",
    reason: "No whitepapers have been authored yet.",
  },
};

export const Videos: Story = {
  args: {
    contentTypeLabel: "videos",
    reason: "There's no video production pipeline yet.",
  },
};

export const Tutorials: Story = {
  args: {
    contentTypeLabel: "interactive tutorials",
    reason:
      "There's no interactive tutorial engine yet — that's a larger build than a single page.",
  },
};
