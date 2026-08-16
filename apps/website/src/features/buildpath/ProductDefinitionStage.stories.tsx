import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ProductDefinitionStage } from "./ProductDefinitionStage";

const meta = {
  title: "BuildPath/ProductDefinitionStage",
  component: ProductDefinitionStage,
} satisfies Meta<typeof ProductDefinitionStage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
