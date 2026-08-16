import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { DiscoveryConversation } from "./DiscoveryConversation";

const meta = {
  title: "BuildPath/DiscoveryConversation",
  component: DiscoveryConversation,
} satisfies Meta<typeof DiscoveryConversation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
