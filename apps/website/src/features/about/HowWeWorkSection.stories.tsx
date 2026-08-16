import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { HowWeWorkSection } from "./HowWeWorkSection";

const meta = {
  title: "About/HowWeWorkSection",
  component: HowWeWorkSection,
} satisfies Meta<typeof HowWeWorkSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
