import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AboutSidebar } from "./AboutSidebar";

const meta = {
  title: "About/AboutSidebar",
  component: AboutSidebar,
} satisfies Meta<typeof AboutSidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
