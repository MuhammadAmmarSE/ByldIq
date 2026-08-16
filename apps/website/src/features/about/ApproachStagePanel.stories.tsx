import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { APPROACH_STAGES } from "./data/approach-stages";
import { ApproachStagePanel } from "./ApproachStagePanel";

const [stage] = APPROACH_STAGES;
if (!stage) throw new Error("Missing approach stage fixture");

const meta = {
  title: "About/ApproachStagePanel",
  component: ApproachStagePanel,
  args: { stage },
} satisfies Meta<typeof ApproachStagePanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
