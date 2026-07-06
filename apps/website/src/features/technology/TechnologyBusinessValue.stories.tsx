import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TECHNOLOGIES } from "./data/technologies";
import { TechnologyBusinessValue } from "./TechnologyBusinessValue";

const technology = TECHNOLOGIES.find((candidate) => candidate.slug === "postgresql");
if (!technology) throw new Error("Missing postgresql fixture");

const meta = {
  title: "Technology/TechnologyBusinessValue",
  component: TechnologyBusinessValue,
  args: { technology },
} satisfies Meta<typeof TechnologyBusinessValue>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
