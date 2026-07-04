import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Label } from "@/components/Label";

import { Textarea } from "./Textarea";

const meta = {
  title: "Foundation/Textarea",
  component: Textarea,
  args: { placeholder: "Tell us about your product..." },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-1.5">
      <Label htmlFor="story-description">Project description</Label>
      <Textarea id="story-description" placeholder="Tell us about your product..." />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "From validation to launch." },
};
