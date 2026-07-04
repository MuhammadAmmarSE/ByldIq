import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Timeline } from "./Timeline";

const meta = {
  title: "Foundation/Timeline",
  component: Timeline,
  args: {
    items: [
      { title: "Discovery", description: "Understand the business.", status: "complete" },
      { title: "Architecture", description: "Design the system.", status: "current" },
      { title: "Engineering", description: "Build and test.", status: "upcoming" },
      { title: "Launch", status: "upcoming" },
    ],
  },
} satisfies Meta<typeof Timeline>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-96">
      <Timeline {...args} />
    </div>
  ),
};
