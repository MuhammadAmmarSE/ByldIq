import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Breadcrumb } from "./Breadcrumb";

const meta = {
  title: "Foundation/Breadcrumb",
  component: Breadcrumb,
  args: {
    items: [
      { label: "Solutions", href: "/solutions" },
      { label: "AI", href: "/solutions/ai" },
      { label: "Conversational Systems" },
    ],
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TwoLevels: Story = {
  args: {
    items: [{ label: "Case Studies", href: "/work" }, { label: "Nova Commerce" }],
  },
};

export const SingleLevel: Story = {
  args: { items: [{ label: "Knowledge Center" }] },
};
