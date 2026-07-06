import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TechnologyExplorer } from "./TechnologyExplorer";

const meta = {
  title: "Technology/TechnologyExplorer",
  component: TechnologyExplorer,
} satisfies Meta<typeof TechnologyExplorer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
