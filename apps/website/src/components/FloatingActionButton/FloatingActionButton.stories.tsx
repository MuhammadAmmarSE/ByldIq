import { Sparkles } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FloatingActionButton } from "./FloatingActionButton";

const meta = {
  title: "Foundation/FloatingActionButton",
  component: FloatingActionButton,
  args: { icon: Sparkles, label: "Ask Byld" },
} satisfies Meta<typeof FloatingActionButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="bg-background relative h-64 w-full">
      <FloatingActionButton {...args} />
    </div>
  ),
};

export const BottomLeft: Story = {
  args: { position: "bottom-left" },
  render: (args) => (
    <div className="bg-background relative h-64 w-full">
      <FloatingActionButton {...args} />
    </div>
  ),
};
