import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SOLUTIONS } from "./data/solutions";
import { SolutionFinalCta } from "./SolutionFinalCta";

const startup = SOLUTIONS.find((solution) => solution.slug === "startup");
if (!startup) throw new Error("Missing startup solution fixture");

const meta = {
  title: "Solutions/SolutionFinalCta",
  component: SolutionFinalCta,
  args: { solution: startup },
} satisfies Meta<typeof SolutionFinalCta>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
