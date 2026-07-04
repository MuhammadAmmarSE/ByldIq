import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Label } from "@/components/Label";

import { Switch } from "./Switch";

const meta = {
  title: "Foundation/Switch",
  component: Switch,
  args: { "aria-label": "Enable notifications" },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="story-notifications" />
      <Label htmlFor="story-notifications">Enable notifications</Label>
    </div>
  ),
};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};
