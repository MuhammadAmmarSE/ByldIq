import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SOLUTIONS } from "./data/solutions";
import { CapabilityExplorer } from "./CapabilityExplorer";

const startup = SOLUTIONS.find((solution) => solution.slug === "startup");
if (!startup) throw new Error("Missing startup solution fixture");

const meta = {
  title: "Solutions/CapabilityExplorer",
  component: CapabilityExplorer,
  args: { solution: startup },
} satisfies Meta<typeof CapabilityExplorer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
