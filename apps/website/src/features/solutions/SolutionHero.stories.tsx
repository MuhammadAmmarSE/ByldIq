import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SOLUTIONS } from "./data/solutions";
import { SolutionHero } from "./SolutionHero";

const startup = SOLUTIONS.find((solution) => solution.slug === "startup");
if (!startup) throw new Error("Missing startup solution fixture");

const meta = {
  title: "Solutions/SolutionHero",
  component: SolutionHero,
  args: { solution: startup },
} satisfies Meta<typeof SolutionHero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
