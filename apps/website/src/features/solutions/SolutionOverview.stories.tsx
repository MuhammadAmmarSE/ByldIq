import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SOLUTIONS } from "./data/solutions";
import { SolutionOverview } from "./SolutionOverview";

const commerce = SOLUTIONS.find((solution) => solution.slug === "commerce");
if (!commerce) throw new Error("Missing commerce solution fixture");

const meta = {
  title: "Solutions/SolutionOverview",
  component: SolutionOverview,
  args: { solution: commerce },
} satisfies Meta<typeof SolutionOverview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
