import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AiPhilosophySection } from "./AiPhilosophySection";

const meta = {
  title: "About/AiPhilosophySection",
  component: AiPhilosophySection,
} satisfies Meta<typeof AiPhilosophySection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
