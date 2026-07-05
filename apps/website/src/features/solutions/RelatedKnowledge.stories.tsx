import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SOLUTIONS } from "./data/solutions";
import { RelatedKnowledge } from "./RelatedKnowledge";

const startup = SOLUTIONS.find((solution) => solution.slug === "startup");
if (!startup) throw new Error("Missing startup solution fixture");

const meta = {
  title: "Solutions/RelatedKnowledge",
  component: RelatedKnowledge,
  args: { solution: startup },
} satisfies Meta<typeof RelatedKnowledge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
