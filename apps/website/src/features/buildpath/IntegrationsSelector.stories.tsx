import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { IntegrationsSelector } from "./IntegrationsSelector";

const meta = {
  title: "BuildPath/IntegrationsSelector",
  component: IntegrationsSelector,
} satisfies Meta<typeof IntegrationsSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
