import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TechnologyStage } from "./TechnologyStage";

const meta = {
  title: "BuildPath/TechnologyStage",
  component: TechnologyStage,
} satisfies Meta<typeof TechnologyStage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
