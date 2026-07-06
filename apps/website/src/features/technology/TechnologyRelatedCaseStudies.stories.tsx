import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TECHNOLOGIES } from "./data/technologies";
import { TechnologyRelatedCaseStudies } from "./TechnologyRelatedCaseStudies";

const technology = TECHNOLOGIES.find((candidate) => candidate.slug === "next-js");
if (!technology) throw new Error("Missing next-js fixture");

const meta = {
  title: "Technology/TechnologyRelatedCaseStudies",
  component: TechnologyRelatedCaseStudies,
  args: { technology },
} satisfies Meta<typeof TechnologyRelatedCaseStudies>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
