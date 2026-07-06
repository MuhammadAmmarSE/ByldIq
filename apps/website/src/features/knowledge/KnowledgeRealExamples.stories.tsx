import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { KNOWLEDGE_ARTICLES } from "./data/articles";
import { KnowledgeRealExamples } from "./KnowledgeRealExamples";

const article = KNOWLEDGE_ARTICLES.find((candidate) => candidate.slug === "validating-an-mvp");
if (!article) throw new Error("Missing validating-an-mvp fixture");

const meta = {
  title: "Knowledge/KnowledgeRealExamples",
  component: KnowledgeRealExamples,
  args: { article },
} satisfies Meta<typeof KnowledgeRealExamples>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
