import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { LEARNING_PATHS } from "./data/learning-paths";
import { KnowledgeLearningPathDetail } from "./KnowledgeLearningPathDetail";

const path = LEARNING_PATHS.find((candidate) => candidate.slug === "startup-founder");
if (!path) throw new Error("Missing startup-founder fixture");

const meta = {
  title: "Knowledge/KnowledgeLearningPathDetail",
  component: KnowledgeLearningPathDetail,
  args: { path },
} satisfies Meta<typeof KnowledgeLearningPathDetail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
