import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { WhatsNextSection } from "./WhatsNextSection";

const meta = {
  title: "About/WhatsNextSection",
  component: WhatsNextSection,
} satisfies Meta<typeof WhatsNextSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
