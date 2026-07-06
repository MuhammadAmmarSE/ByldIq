import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { KnowledgeHero } from "./KnowledgeHero";

const meta = {
  title: "Knowledge/KnowledgeHero",
  component: KnowledgeHero,
  args: {
    query: "",
    onQueryChange: () => {},
    categories: [
      { slug: "architecture", label: "Architecture" },
      { slug: "ai", label: "AI" },
      { slug: "mvp", label: "MVP" },
      { slug: "accessibility", label: "Accessibility" },
      { slug: "shopify", label: "Shopify" },
    ],
    categoryFilter: null,
    onCategoryQuickFilter: () => {},
  },
} satisfies Meta<typeof KnowledgeHero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomCopy: Story = {
  args: {
    categoryFilter: "architecture",
    headline: "Architecture guides.",
    supportingCopy: "Guides on system design, trade-offs, and scaling decisions.",
  },
};
