import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AboutHero } from "./AboutHero";

const meta = {
  title: "About/AboutHero",
  component: AboutHero,
} satisfies Meta<typeof AboutHero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
