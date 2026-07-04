import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Label } from "@/components/Label";

import { Checkbox } from "./Checkbox";

const meta = {
  title: "Foundation/Checkbox",
  component: Checkbox,
  args: { "aria-label": "Accept terms" },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="story-terms" />
      <Label htmlFor="story-terms">I agree to the terms of service</Label>
    </div>
  ),
};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};
