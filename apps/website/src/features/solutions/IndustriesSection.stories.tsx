import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { IndustriesSection } from "./IndustriesSection";

const meta = {
  title: "Solutions/IndustriesSection",
  component: IndustriesSection,
} satisfies Meta<typeof IndustriesSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
