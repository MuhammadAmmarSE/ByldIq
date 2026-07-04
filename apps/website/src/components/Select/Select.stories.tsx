import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Label } from "@/components/Label";

import { Select } from "./Select";

const journeyOptions = [
  { value: "startup", label: "Startup" },
  { value: "enterprise", label: "Enterprise" },
  { value: "commerce", label: "Commerce" },
  { value: "ai", label: "Artificial Intelligence" },
  { value: "platform", label: "Platform" },
];

const meta = {
  title: "Foundation/Select",
  component: Select,
  args: { options: journeyOptions, placeholder: "Choose a journey", "aria-label": "Journey" },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  render: ({ "aria-label": _ariaLabel, ...args }) => (
    <div className="flex w-72 flex-col gap-1.5">
      <Label htmlFor="story-journey">Journey</Label>
      <Select {...args} id="story-journey" />
    </div>
  ),
};

export const WithDisabledOption: Story = {
  args: {
    options: [
      ...journeyOptions.slice(0, 3),
      { value: "labs", label: "Labs (coming soon)", disabled: true },
    ],
  },
};

export const Invalid: Story = {
  args: { invalid: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};
