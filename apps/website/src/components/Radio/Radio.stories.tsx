import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Label } from "@/components/Label";

import { RadioGroup, RadioGroupItem } from "./Radio";

const meta = {
  title: "Foundation/Radio",
  component: RadioGroup,
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup aria-label="Journey" defaultValue="startup">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="startup" id="journey-startup" />
        <Label htmlFor="journey-startup">Startup</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="enterprise" id="journey-enterprise" />
        <Label htmlFor="journey-enterprise">Enterprise</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="commerce" id="journey-commerce" />
        <Label htmlFor="journey-commerce">Commerce</Label>
      </div>
    </RadioGroup>
  ),
};

export const WithDisabledOption: Story = {
  render: () => (
    <RadioGroup aria-label="Journey" defaultValue="startup">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="startup" id="journey-startup-2" />
        <Label htmlFor="journey-startup-2">Startup</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="platform" id="journey-platform-2" disabled />
        <Label htmlFor="journey-platform-2">Platform (coming soon)</Label>
      </div>
    </RadioGroup>
  ),
};
