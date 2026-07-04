import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useEffect } from "react";

import { useAppStore } from "@/providers/StoreProvider";
import type { Journey } from "@/types/journey";

import { AdaptiveHero } from "./AdaptiveHero";

function WithJourney({ journey }: { journey: Journey }) {
  const setJourney = useAppStore((state) => state.setJourney);
  useEffect(() => setJourney(journey), [journey, setJourney]);
  return <AdaptiveHero />;
}

const meta = {
  title: "Homepage/AdaptiveHero",
  component: AdaptiveHero,
  parameters: {
    // The stagger-in entrance (Reveal-style) can snapshot mid-fade — same
    // documented false-positive as JourneySelector/Reveal's own stories.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
} satisfies Meta<typeof AdaptiveHero>;

export default meta;

type Story = StoryObj<typeof meta>;

/** No journey selected — the generic/default variant. */
export const Default: Story = {};

export const Startup: Story = {
  render: () => <WithJourney journey="startup" />,
};

export const Enterprise: Story = {
  render: () => <WithJourney journey="enterprise" />,
};

export const AI: Story = {
  render: () => <WithJourney journey="ai" />,
};
