import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Divider } from "./Divider";

const meta = {
  title: "Foundation/Divider",
  component: Divider,
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-64">
      <p className="text-foreground">Above</p>
      <Divider className="my-4" />
      <p className="text-foreground">Below</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-12 items-center gap-4">
      <p className="text-foreground">Left</p>
      <Divider orientation="vertical" />
      <p className="text-foreground">Right</p>
    </div>
  ),
};
