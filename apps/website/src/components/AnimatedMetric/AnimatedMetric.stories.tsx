import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AnimatedMetric } from "./AnimatedMetric";

const meta = {
  title: "Foundation/AnimatedMetric",
  component: AnimatedMetric,
  args: {
    value: "+17%",
    label: "Checkout conversion",
  },
} satisfies Meta<typeof AnimatedMetric>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Decimal: Story = {
  args: {
    value: "99.97%",
    label: "Platform uptime",
  },
};

export const Negative: Story = {
  args: {
    value: "-64%",
    label: "First-response time",
  },
};

export const NonNumericFallback: Story = {
  args: {
    value: "Zero unplanned",
    label: "Migration downtime",
  },
};

export const Row: Story = {
  render: () => (
    <div className="grid max-w-3xl gap-6 sm:grid-cols-3">
      <AnimatedMetric value="+17%" label="Checkout conversion" />
      <AnimatedMetric value="99.97%" label="Platform uptime" />
      <AnimatedMetric value="2 days -> 12 min" label="Environment provisioning" />
    </div>
  ),
};
