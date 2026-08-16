import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ArchitectureStage } from "./ArchitectureStage";

const meta = {
  title: "BuildPath/ArchitectureStage",
  component: ArchitectureStage,
} satisfies Meta<typeof ArchitectureStage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
