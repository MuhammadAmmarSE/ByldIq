import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Progress } from "./Progress";

const meta = {
  title: "Foundation/Progress",
  component: Progress,
  args: { value: 40, label: "Generating roadmap" },
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-80">
      <Progress {...args} />
    </div>
  ),
};

export const Stages: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      {[0, 25, 60, 100].map((value) => (
        <Progress key={value} value={value} max={100} label={`${value}% complete`} />
      ))}
    </div>
  ),
};
