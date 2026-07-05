import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SOLUTIONS } from "./data/solutions";
import { RelatedCaseStudies } from "./RelatedCaseStudies";

const startup = SOLUTIONS.find((solution) => solution.slug === "startup");
if (!startup) throw new Error("Missing startup solution fixture");

const meta = {
  title: "Solutions/RelatedCaseStudies",
  component: RelatedCaseStudies,
  args: { solution: startup },
} satisfies Meta<typeof RelatedCaseStudies>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
