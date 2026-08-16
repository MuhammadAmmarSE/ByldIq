import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { KNOWLEDGE_ARTICLES } from "./data/articles";
import { KnowledgeRelatedSolutions } from "./KnowledgeRelatedSolutions";

const article = KNOWLEDGE_ARTICLES.find((candidate) => candidate.slug === "validating-an-mvp");
if (!article) throw new Error("Missing validating-an-mvp fixture");

const meta = {
  title: "Knowledge/KnowledgeRelatedSolutions",
  component: KnowledgeRelatedSolutions,
  args: { article },
} satisfies Meta<typeof KnowledgeRelatedSolutions>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
