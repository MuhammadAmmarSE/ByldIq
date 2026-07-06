import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TECHNOLOGIES } from "./data/technologies";
import { TechnologyArchitecture } from "./TechnologyArchitecture";

const technology = TECHNOLOGIES.find((candidate) => candidate.slug === "next-js");
if (!technology) throw new Error("Missing next-js fixture");

const meta = {
  title: "Technology/TechnologyArchitecture",
  component: TechnologyArchitecture,
  args: { technology },
} satisfies Meta<typeof TechnologyArchitecture>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
