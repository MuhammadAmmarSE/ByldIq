import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TechnologyPhilosophyFlow } from "./TechnologyPhilosophyFlow";

const meta = {
  title: "About/TechnologyPhilosophyFlow",
  component: TechnologyPhilosophyFlow,
} satisfies Meta<typeof TechnologyPhilosophyFlow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
