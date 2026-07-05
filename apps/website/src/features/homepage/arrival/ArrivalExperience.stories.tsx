import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ArrivalExperience } from "./ArrivalExperience";

const meta = {
  title: "Homepage/ArrivalExperience",
  component: ArrivalExperience,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ArrivalExperience>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Plays the full first-time sequence: background, logo assembly, wordmark, tagline, then dissolves after ~3s. */
export const FirstVisit: Story = {
  args: { initialHasSeenIntro: false },
};

/** A returning visitor (or a visit under `prefers-reduced-motion`) never sees the overlay — renders nothing. */
export const ReturningVisitor: Story = {
  args: { initialHasSeenIntro: true },
};
