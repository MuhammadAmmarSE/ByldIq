import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SolutionsAiAdvisor } from "./SolutionsAiAdvisor";

const meta = {
  title: "Solutions/SolutionsAiAdvisor",
  component: SolutionsAiAdvisor,
} satisfies Meta<typeof SolutionsAiAdvisor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
