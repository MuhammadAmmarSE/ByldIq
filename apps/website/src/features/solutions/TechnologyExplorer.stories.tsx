import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SOLUTIONS } from "./data/solutions";
import { TechnologyExplorer } from "./TechnologyExplorer";

const startup = SOLUTIONS.find((solution) => solution.slug === "startup");
if (!startup) throw new Error("Missing startup solution fixture");

const meta = {
  title: "Solutions/TechnologyExplorer",
  component: TechnologyExplorer,
  args: { solution: startup },
} satisfies Meta<typeof TechnologyExplorer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
