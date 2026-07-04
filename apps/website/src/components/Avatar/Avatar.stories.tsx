import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AVATAR_SIZES } from "./Avatar.types";
import { Avatar } from "./Avatar";

const meta = {
  title: "Foundation/Avatar",
  component: Avatar,
  args: { alt: "Byld IQ team member", fallback: "BI" },
  argTypes: {
    size: { control: "select", options: AVATAR_SIZES },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      {AVATAR_SIZES.map((size) => (
        <Avatar key={size} alt="Byld IQ team member" fallback="BI" size={size} />
      ))}
    </div>
  ),
};

export const FallbackOnly: Story = {
  args: { fallback: "AI" },
};
