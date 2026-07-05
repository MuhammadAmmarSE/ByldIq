import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SOLUTIONS } from "./data/solutions";
import { ArchitectureExplorer } from "./ArchitectureExplorer";

const startup = SOLUTIONS.find((solution) => solution.slug === "startup");
if (!startup) throw new Error("Missing startup solution fixture");

const meta = {
  title: "Solutions/ArchitectureExplorer",
  component: ArchitectureExplorer,
  args: { solution: startup },
} satisfies Meta<typeof ArchitectureExplorer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
