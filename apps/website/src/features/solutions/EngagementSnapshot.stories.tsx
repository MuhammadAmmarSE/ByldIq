import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SOLUTIONS } from "./data/solutions";
import { EngagementSnapshot } from "./EngagementSnapshot";

const startup = SOLUTIONS.find((solution) => solution.slug === "startup");
if (!startup) throw new Error("Missing startup solution fixture");

const meta = {
  title: "Solutions/EngagementSnapshot",
  component: EngagementSnapshot,
  args: { solution: startup },
} satisfies Meta<typeof EngagementSnapshot>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
