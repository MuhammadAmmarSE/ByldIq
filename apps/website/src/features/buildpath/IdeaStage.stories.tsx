import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { IdeaStage } from "./IdeaStage";

const meta = {
  title: "BuildPath/IdeaStage",
  component: IdeaStage,
} satisfies Meta<typeof IdeaStage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
