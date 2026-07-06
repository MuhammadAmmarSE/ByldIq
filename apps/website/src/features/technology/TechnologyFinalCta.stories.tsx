import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TECHNOLOGIES } from "./data/technologies";
import { TechnologyFinalCta } from "./TechnologyFinalCta";

const technology = TECHNOLOGIES.find((candidate) => candidate.slug === "next-js");
if (!technology) throw new Error("Missing next-js fixture");

const meta = {
  title: "Technology/TechnologyFinalCta",
  component: TechnologyFinalCta,
  args: { technology },
} satisfies Meta<typeof TechnologyFinalCta>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
