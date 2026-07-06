import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TechnologyHero } from "./TechnologyHero";

const meta = {
  title: "Technology/TechnologyHero",
  component: TechnologyHero,
  args: {
    query: "",
    onQueryChange: () => {},
    categories: [
      { slug: "frontend", label: "Frontend" },
      { slug: "backend", label: "Backend" },
      { slug: "databases", label: "Databases" },
      { slug: "cloud", label: "Cloud" },
      { slug: "ai", label: "AI" },
    ],
    categoryFilter: null,
    onCategoryQuickFilter: () => {},
  },
} satisfies Meta<typeof TechnologyHero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
