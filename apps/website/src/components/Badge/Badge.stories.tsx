import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { BADGE_VARIANTS } from "./Badge.types";
import { Badge } from "./Badge";

const meta = {
  title: "Foundation/Badge",
  component: Badge,
  args: { children: "Startup" },
  argTypes: {
    variant: { control: "select", options: BADGE_VARIANTS },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {BADGE_VARIANTS.map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
};
