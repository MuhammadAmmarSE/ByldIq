import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TECHNOLOGIES } from "./data/technologies";
import { TechnologyCard } from "./TechnologyCard";

const technology = TECHNOLOGIES.find((candidate) => candidate.slug === "next-js");
if (!technology) throw new Error("Missing next-js fixture");

const meta = {
  title: "Technology/TechnologyCard",
  component: TechnologyCard,
  args: {
    technology,
    categoryLabel: "Frontend",
  },
} satisfies Meta<typeof TechnologyCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutCategory: Story = {
  args: { categoryLabel: undefined },
};
