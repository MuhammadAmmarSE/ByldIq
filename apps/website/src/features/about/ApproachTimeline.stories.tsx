import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ApproachTimeline } from "./ApproachTimeline";

const meta = {
  title: "About/ApproachTimeline",
  component: ApproachTimeline,
} satisfies Meta<typeof ApproachTimeline>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
