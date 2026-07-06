import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TechnologySidebar } from "./TechnologySidebar";

const meta = {
  title: "Technology/TechnologySidebar",
  component: TechnologySidebar,
} satisfies Meta<typeof TechnologySidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
