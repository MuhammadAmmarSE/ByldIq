import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TeamSection } from "./TeamSection";

const meta = {
  title: "About/TeamSection",
  component: TeamSection,
} satisfies Meta<typeof TeamSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
