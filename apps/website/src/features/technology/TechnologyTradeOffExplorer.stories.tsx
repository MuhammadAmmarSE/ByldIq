import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TECHNOLOGIES } from "./data/technologies";
import { TechnologyTradeOffExplorer } from "./TechnologyTradeOffExplorer";

const technology = TECHNOLOGIES.find((candidate) => candidate.slug === "kubernetes");
if (!technology) throw new Error("Missing kubernetes fixture");

const meta = {
  title: "Technology/TechnologyTradeOffExplorer",
  component: TechnologyTradeOffExplorer,
  args: { technology },
} satisfies Meta<typeof TechnologyTradeOffExplorer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
