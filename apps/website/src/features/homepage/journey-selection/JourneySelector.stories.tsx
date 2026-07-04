import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { JourneySelector } from "./JourneySelector";

const meta = {
  title: "Homepage/JourneySelector",
  component: JourneySelector,
  parameters: {
    // Each card is wrapped in `Reveal` (whileInView fade). The a11y check can
    // snapshot mid-fade, catching a transient partial-opacity frame that reads
    // as a false-positive contrast failure — same rationale as Reveal's own
    // story. Steady-state contrast of this same content is covered by
    // JourneyCard's stories and Badge's own stories.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
} satisfies Meta<typeof JourneySelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
