import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SOLUTIONS } from "./data/solutions";
import { SolutionFaqSection } from "./SolutionFaqSection";

const startup = SOLUTIONS.find((solution) => solution.slug === "startup");
if (!startup) throw new Error("Missing startup solution fixture");

const meta = {
  title: "Solutions/SolutionFaqSection",
  component: SolutionFaqSection,
  args: { solution: startup },
} satisfies Meta<typeof SolutionFaqSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
