import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TECHNOLOGIES } from "./data/technologies";
import { TechnologyStrengthsWeaknesses } from "./TechnologyStrengthsWeaknesses";

const technology = TECHNOLOGIES.find((candidate) => candidate.slug === "mongodb");
if (!technology) throw new Error("Missing mongodb fixture");

const meta = {
  title: "Technology/TechnologyStrengthsWeaknesses",
  component: TechnologyStrengthsWeaknesses,
  args: { technology },
} satisfies Meta<typeof TechnologyStrengthsWeaknesses>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
