import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TargetUsersPanel } from "./TargetUsersPanel";

const meta = {
  title: "BuildPath/TargetUsersPanel",
  component: TargetUsersPanel,
} satisfies Meta<typeof TargetUsersPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
