import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FeatureBoard } from "./FeatureBoard";

const meta = {
  title: "BuildPath/FeatureBoard",
  component: FeatureBoard,
} satisfies Meta<typeof FeatureBoard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
