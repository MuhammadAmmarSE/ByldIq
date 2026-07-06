import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { KNOWLEDGE_ARTICLES } from "./data/articles";
import { KnowledgeWhyItMatters } from "./KnowledgeWhyItMatters";

const article = KNOWLEDGE_ARTICLES.find((candidate) => candidate.slug === "validating-an-mvp");
if (!article) throw new Error("Missing validating-an-mvp fixture");

const meta = {
  title: "Knowledge/KnowledgeWhyItMatters",
  component: KnowledgeWhyItMatters,
  args: { article },
} satisfies Meta<typeof KnowledgeWhyItMatters>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
