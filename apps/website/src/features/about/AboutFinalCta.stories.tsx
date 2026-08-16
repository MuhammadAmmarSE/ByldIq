import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AboutFinalCta } from "./AboutFinalCta";

const meta = {
  title: "About/AboutFinalCta",
  component: AboutFinalCta,
} satisfies Meta<typeof AboutFinalCta>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
