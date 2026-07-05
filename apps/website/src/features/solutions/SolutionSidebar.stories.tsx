import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SolutionSidebar } from "./SolutionSidebar";

const meta = {
  title: "Solutions/SolutionSidebar",
  component: SolutionSidebar,
} satisfies Meta<typeof SolutionSidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
