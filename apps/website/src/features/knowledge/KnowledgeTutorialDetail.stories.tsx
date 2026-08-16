import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TUTORIALS } from "./data/tutorials";
import { KnowledgeTutorialDetail } from "./KnowledgeTutorialDetail";

const tutorial = TUTORIALS.find(
  (candidate) => candidate.slug === "automated-accessibility-testing-with-axe",
);
if (!tutorial) throw new Error("Missing automated-accessibility-testing-with-axe fixture");

const meta = {
  title: "Knowledge/KnowledgeTutorialDetail",
  component: KnowledgeTutorialDetail,
  args: { tutorial, categoryLabel: "Testing" },
} satisfies Meta<typeof KnowledgeTutorialDetail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
