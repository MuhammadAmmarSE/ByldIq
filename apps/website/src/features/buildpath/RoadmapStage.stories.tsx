import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { RoadmapStage } from "./RoadmapStage";

const meta = {
  title: "BuildPath/RoadmapStage",
  component: RoadmapStage,
} satisfies Meta<typeof RoadmapStage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
