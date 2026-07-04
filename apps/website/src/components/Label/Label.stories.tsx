import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Input } from "@/components/Input";

import { Label } from "./Label";

const meta = {
  title: "Foundation/Label",
  component: Label,
  args: { children: "Company name" },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithInput: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-1.5">
      <Label htmlFor="company-name">Company name</Label>
      <Input id="company-name" placeholder="Byld IQ" />
    </div>
  ),
};
