import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { JOURNEY_DEFINITIONS } from "./data/journeys";
import { JourneyCard } from "./JourneyCard";

const [startupJourney] = JOURNEY_DEFINITIONS;
if (!startupJourney) {
  throw new Error("JOURNEY_DEFINITIONS must not be empty");
}

const meta = {
  title: "Homepage/JourneyCard",
  component: JourneyCard,
  args: {
    journey: startupJourney,
    isSelected: false,
    isAnySelected: false,
  },
  render: (args) => (
    <RadioGroupPrimitive.Root aria-label="Journey" className="max-w-xs">
      <JourneyCard {...args} />
    </RadioGroupPrimitive.Root>
  ),
} satisfies Meta<typeof JourneyCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: { isSelected: true, isAnySelected: true },
};

export const Deemphasized: Story = {
  name: "Deemphasized (another card is selected)",
  args: { isSelected: false, isAnySelected: true },
};
