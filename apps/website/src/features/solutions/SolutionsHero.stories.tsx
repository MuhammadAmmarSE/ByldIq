import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SolutionsHero } from "./SolutionsHero";

const meta = {
  title: "Solutions/SolutionsHero",
  component: SolutionsHero,
} satisfies Meta<typeof SolutionsHero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
