import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TEXT_VARIANTS } from "./Text.types";
import { Text } from "./Text";

const meta = {
  title: "Foundation/Text",
  component: Text,
  args: {
    children:
      "Every product represents a business challenge solved through thoughtful engineering.",
  },
  argTypes: {
    variant: { control: "select", options: TEXT_VARIANTS },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-3">
      {TEXT_VARIANTS.map((variant) => (
        <Text key={variant} variant={variant}>
          {variant === "code" ? "const byld = engineer(product);" : `${variant} — sample text.`}
        </Text>
      ))}
    </div>
  ),
};
