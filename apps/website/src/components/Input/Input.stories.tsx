import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Label } from "@/components/Label";

import { Input } from "./Input";

const meta = {
  title: "Foundation/Input",
  component: Input,
  args: { placeholder: "Byld IQ" },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-1.5">
      <Label htmlFor="story-company-name">Company name</Label>
      <Input id="story-company-name" placeholder="Byld IQ" />
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-1.5">
      <Label htmlFor="story-email">Email</Label>
      <Input
        id="story-email"
        invalid
        defaultValue="not-an-email"
        aria-describedby="story-email-error"
      />
      <p id="story-email-error" className="text-danger text-sm">
        We couldn&apos;t verify that email address. Please check the spelling and try again.
      </p>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Byld IQ" },
};
