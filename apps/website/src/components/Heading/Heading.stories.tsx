import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { HEADING_VARIANTS } from "./Heading.types";
import { Heading } from "./Heading";

const meta = {
  title: "Foundation/Heading",
  component: Heading,
  args: { children: "Build products that scale." },
  argTypes: {
    variant: { control: "select", options: HEADING_VARIANTS },
  },
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      {HEADING_VARIANTS.map((variant) => (
        <Heading key={variant} variant={variant}>
          {variant} — Build products that scale.
        </Heading>
      ))}
    </div>
  ),
};
