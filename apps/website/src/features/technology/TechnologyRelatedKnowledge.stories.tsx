import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TECHNOLOGIES } from "./data/technologies";
import { TechnologyRelatedKnowledge } from "./TechnologyRelatedKnowledge";

const technology = TECHNOLOGIES.find((candidate) => candidate.slug === "next-js");
if (!technology) throw new Error("Missing next-js fixture");

const meta = {
  title: "Technology/TechnologyRelatedKnowledge",
  component: TechnologyRelatedKnowledge,
  args: { technology },
} satisfies Meta<typeof TechnologyRelatedKnowledge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
