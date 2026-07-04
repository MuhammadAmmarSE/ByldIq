import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Skeleton } from "./Skeleton";

const meta = {
  title: "Foundation/Skeleton",
  component: Skeleton,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TextLine: Story = {
  args: { className: "h-4 w-48" },
};

export const Avatar: Story = {
  args: { className: "h-12 w-12 rounded-full" },
};

export const CardBlock: Story = {
  render: () => (
    <div className="max-w-sm space-y-3">
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  ),
};
