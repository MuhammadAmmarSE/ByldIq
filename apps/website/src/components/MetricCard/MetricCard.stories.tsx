import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { MetricCard } from "./MetricCard";

const meta = {
  title: "Foundation/MetricCard",
  component: MetricCard,
  args: {
    value: 12400,
    label: "Active users",
    suffix: "+",
  },
} satisfies Meta<typeof MetricCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Percentage: Story = {
  args: {
    value: 98,
    label: "Deployment success rate",
    suffix: "%",
  },
};

export const Row: Story = {
  render: () => (
    <div className="grid max-w-2xl gap-6 sm:grid-cols-3">
      <MetricCard value={12400} label="Active users" suffix="+" />
      <MetricCard value={98} label="Deployment success rate" suffix="%" />
      <MetricCard value={2} label="Average cost reduction" prefix="$" suffix="M" />
    </div>
  ),
};
