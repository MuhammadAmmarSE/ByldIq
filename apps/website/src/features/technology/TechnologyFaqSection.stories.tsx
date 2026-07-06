import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TECHNOLOGIES } from "./data/technologies";
import { TechnologyFaqSection } from "./TechnologyFaqSection";

const technology = TECHNOLOGIES.find((candidate) => candidate.slug === "next-js");
if (!technology) throw new Error("Missing next-js fixture");

const meta = {
  title: "Technology/TechnologyFaqSection",
  component: TechnologyFaqSection,
  args: { technology },
} satisfies Meta<typeof TechnologyFaqSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
