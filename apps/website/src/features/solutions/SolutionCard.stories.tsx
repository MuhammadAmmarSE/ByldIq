import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SOLUTIONS } from "./data/solutions";
import { SolutionCard } from "./SolutionCard";

const startup = SOLUTIONS.find((solution) => solution.slug === "startup");
if (!startup) throw new Error("Missing startup solution fixture");

const meta = {
  title: "Solutions/SolutionCard",
  component: SolutionCard,
  args: { solution: startup },
} satisfies Meta<typeof SolutionCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Recommended: Story = {
  args: { isRecommended: true },
};
