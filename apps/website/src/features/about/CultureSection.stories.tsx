import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CultureSection } from "./CultureSection";

const meta = {
  title: "About/CultureSection",
  component: CultureSection,
} satisfies Meta<typeof CultureSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
