import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { KnowledgeLearningPaths } from "./KnowledgeLearningPaths";

const meta = {
  title: "Knowledge/KnowledgeLearningPaths",
  component: KnowledgeLearningPaths,
} satisfies Meta<typeof KnowledgeLearningPaths>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
