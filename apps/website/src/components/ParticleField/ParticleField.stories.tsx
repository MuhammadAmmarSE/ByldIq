import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ParticleField } from "./ParticleField";

const meta = {
  title: "Foundation/ParticleField",
  component: ParticleField,
  decorators: [
    (Story) => (
      <div className="bg-surface-raised relative h-64 w-full overflow-hidden rounded-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ParticleField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Dense: Story = {
  args: { count: 24 },
};
