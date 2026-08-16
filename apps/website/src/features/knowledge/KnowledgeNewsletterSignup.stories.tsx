import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { KnowledgeNewsletterSignup } from "./KnowledgeNewsletterSignup";

const meta = {
  title: "Knowledge/KnowledgeNewsletterSignup",
  component: KnowledgeNewsletterSignup,
} satisfies Meta<typeof KnowledgeNewsletterSignup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
