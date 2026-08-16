import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { KnowledgeTutorials } from "./KnowledgeTutorials";

const meta = {
  title: "Knowledge/KnowledgeTutorials",
  component: KnowledgeTutorials,
} satisfies Meta<typeof KnowledgeTutorials>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
