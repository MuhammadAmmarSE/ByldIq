import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/Button";

import { Tooltip } from "./Tooltip";

const meta = {
  title: "Foundation/Tooltip",
  component: Tooltip,
  args: { content: "Book a discovery call", children: <button type="button">Trigger</button> },
  parameters: {
    // Needs room around the trigger for the tooltip to render without clipping.
    layout: "centered",
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button>Talk to Byld</Button>
    </Tooltip>
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Tooltip content="Top" side="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      <Tooltip content="Right" side="right">
        <Button variant="outline">Right</Button>
      </Tooltip>
      <Tooltip content="Bottom" side="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left" side="left">
        <Button variant="outline">Left</Button>
      </Tooltip>
    </div>
  ),
};
