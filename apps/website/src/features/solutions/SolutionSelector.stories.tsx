import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SolutionSelector } from "./SolutionSelector";

const meta = {
  title: "Solutions/SolutionSelector",
  component: SolutionSelector,
  parameters: {
    // Each card is wrapped in `Reveal` (whileInView fade) — same
    // mid-animation false-positive rationale as the homepage's
    // JourneySelector story.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
} satisfies Meta<typeof SolutionSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
