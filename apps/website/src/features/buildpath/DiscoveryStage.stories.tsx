import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { DiscoveryStage } from "./DiscoveryStage";

const meta = {
  title: "BuildPath/DiscoveryStage",
  component: DiscoveryStage,
} satisfies Meta<typeof DiscoveryStage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
