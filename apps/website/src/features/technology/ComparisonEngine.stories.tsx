import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ComparisonEngine } from "./ComparisonEngine";

const meta = {
  title: "Technology/ComparisonEngine",
  component: ComparisonEngine,
} satisfies Meta<typeof ComparisonEngine>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Databases: Story = {
  args: { initialSlugA: "postgresql", initialSlugB: "mongodb" },
};
