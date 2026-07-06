import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TECHNOLOGIES } from "./data/technologies";
import { TechnologyRelatedSolutions } from "./TechnologyRelatedSolutions";

const technology = TECHNOLOGIES.find((candidate) => candidate.slug === "next-js");
if (!technology) throw new Error("Missing next-js fixture");

const meta = {
  title: "Technology/TechnologyRelatedSolutions",
  component: TechnologyRelatedSolutions,
  args: { technology },
} satisfies Meta<typeof TechnologyRelatedSolutions>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
