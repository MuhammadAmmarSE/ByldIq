import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TECHNOLOGIES } from "./data/technologies";
import { TechnologyDeepDive } from "./TechnologyDeepDive";

const technology = TECHNOLOGIES.find((candidate) => candidate.slug === "openai");
if (!technology) throw new Error("Missing openai fixture");

const meta = {
  title: "Technology/TechnologyDeepDive",
  component: TechnologyDeepDive,
  args: { technology },
} satisfies Meta<typeof TechnologyDeepDive>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
