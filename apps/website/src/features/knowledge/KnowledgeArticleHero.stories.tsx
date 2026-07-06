import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { KNOWLEDGE_ARTICLES } from "./data/articles";
import { KnowledgeArticleHero } from "./KnowledgeArticleHero";

const article = KNOWLEDGE_ARTICLES.find((candidate) => candidate.slug === "validating-an-mvp");
if (!article) throw new Error("Missing validating-an-mvp fixture");

const meta = {
  title: "Knowledge/KnowledgeArticleHero",
  component: KnowledgeArticleHero,
  args: { article, categoryLabel: "MVP" },
} satisfies Meta<typeof KnowledgeArticleHero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
