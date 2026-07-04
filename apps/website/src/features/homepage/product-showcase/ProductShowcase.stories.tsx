import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ProductShowcase } from "./ProductShowcase";

const meta = {
  title: "Homepage/ProductShowcase",
  component: ProductShowcase,
} satisfies Meta<typeof ProductShowcase>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
