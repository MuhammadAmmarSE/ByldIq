import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SOLUTIONS } from "./data/solutions";
import { SuccessMetrics } from "./SuccessMetrics";

const startup = SOLUTIONS.find((solution) => solution.slug === "startup");
if (!startup) throw new Error("Missing startup solution fixture");

const meta = {
  title: "Solutions/SuccessMetrics",
  component: SuccessMetrics,
  args: { solution: startup },
} satisfies Meta<typeof SuccessMetrics>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
