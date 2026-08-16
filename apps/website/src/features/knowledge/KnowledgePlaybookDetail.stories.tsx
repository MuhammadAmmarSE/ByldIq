import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { KNOWLEDGE_ARTICLES } from "./data/articles";
import { KnowledgePlaybookDetail } from "./KnowledgePlaybookDetail";

const article = KNOWLEDGE_ARTICLES.find(
  (candidate) => candidate.slug === "architecture-review-playbook",
);
if (!article) throw new Error("Missing architecture-review-playbook fixture");

const meta = {
  title: "Knowledge/KnowledgePlaybookDetail",
  component: KnowledgePlaybookDetail,
  args: { article, categoryLabel: "Architecture" },
} satisfies Meta<typeof KnowledgePlaybookDetail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
