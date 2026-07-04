import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TIMELINE_STAGES } from "./data/stages";
import { StagePanel } from "./StagePanel";

function requireStage(id: string) {
  const stage = TIMELINE_STAGES.find((candidate) => candidate.id === id);
  if (!stage) throw new Error(`Missing stage fixture: ${id}`);
  return stage;
}

const meta = {
  title: "Homepage/StagePanel",
  component: StagePanel,
  args: { stage: requireStage("architecture") },
} satisfies Meta<typeof StagePanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoTechnologies: Story = {
  name: "Stage with no technologies (e.g. Idea)",
  args: { stage: requireStage("idea") },
};
