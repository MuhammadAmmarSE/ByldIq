import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PhilosophyPrinciples } from "./PhilosophyPrinciples";

const meta = {
  title: "About/PhilosophyPrinciples",
  component: PhilosophyPrinciples,
} satisfies Meta<typeof PhilosophyPrinciples>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
