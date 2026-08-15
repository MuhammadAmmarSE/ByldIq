import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AnimatedMetricValue } from "./AnimatedMetricValue";

const meta = {
  title: "Foundation/AnimatedMetricValue",
  component: AnimatedMetricValue,
  args: {
    value: "+17%",
  },
} satisfies Meta<typeof AnimatedMetricValue>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <span className="text-foreground text-2xl font-semibold tabular-nums">
      <AnimatedMetricValue {...args} />
    </span>
  ),
};

export const NonNumericFallback: Story = {
  args: {
    value: "Zero unplanned",
  },
  render: (args) => (
    <span className="text-foreground text-2xl font-semibold tabular-nums">
      <AnimatedMetricValue {...args} />
    </span>
  ),
};

export const CompactRow: Story = {
  render: () => (
    <div className="grid max-w-sm grid-cols-2 gap-3">
      <div>
        <p className="text-foreground text-lg font-semibold">
          <AnimatedMetricValue value="+17%" />
        </p>
        <p className="text-muted text-xs">Checkout conversion</p>
      </div>
      <div>
        <p className="text-foreground text-lg font-semibold">
          <AnimatedMetricValue value="99.97%" />
        </p>
        <p className="text-muted text-xs">Platform uptime</p>
      </div>
    </div>
  ),
};
