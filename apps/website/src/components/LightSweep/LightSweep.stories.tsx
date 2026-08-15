import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { LightSweep } from "./LightSweep";

const meta = {
  title: "Foundation/LightSweep",
  component: LightSweep,
  decorators: [
    (Story) => (
      <div className="bg-surface-raised relative h-64 w-full overflow-hidden rounded-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LightSweep>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Frequent: Story = {
  args: { interval: 2 },
};
