import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { KNOWLEDGE_ARTICLES } from "./data/articles";
import { KnowledgeRelatedTechnologies } from "./KnowledgeRelatedTechnologies";

const article = KNOWLEDGE_ARTICLES.find((candidate) => candidate.slug === "validating-an-mvp");
if (!article) throw new Error("Missing validating-an-mvp fixture");

const meta = {
  title: "Knowledge/KnowledgeRelatedTechnologies",
  component: KnowledgeRelatedTechnologies,
  args: { article },
} satisfies Meta<typeof KnowledgeRelatedTechnologies>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
