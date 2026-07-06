import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TECHNOLOGIES } from "./data/technologies";
import { TechnologyDetailHero } from "./TechnologyDetailHero";

const technology = TECHNOLOGIES.find((candidate) => candidate.slug === "next-js");
if (!technology) throw new Error("Missing next-js fixture");

const meta = {
  title: "Technology/TechnologyDetailHero",
  component: TechnologyDetailHero,
  args: { technology, categoryLabel: "Frontend" },
} satisfies Meta<typeof TechnologyDetailHero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
