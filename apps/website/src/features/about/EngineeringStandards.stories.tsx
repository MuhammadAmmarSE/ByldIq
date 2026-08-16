import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { EngineeringStandards } from "./EngineeringStandards";

const meta = {
  title: "About/EngineeringStandards",
  component: EngineeringStandards,
} satisfies Meta<typeof EngineeringStandards>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
