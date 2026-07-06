import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { KNOWLEDGE_ARTICLES } from "./data/articles";
import { KnowledgeWalkthrough } from "./KnowledgeWalkthrough";

const article = KNOWLEDGE_ARTICLES.find((candidate) => candidate.slug === "validating-an-mvp");
if (!article) throw new Error("Missing validating-an-mvp fixture");

const meta = {
  title: "Knowledge/KnowledgeWalkthrough",
  component: KnowledgeWalkthrough,
  args: { article },
} satisfies Meta<typeof KnowledgeWalkthrough>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
