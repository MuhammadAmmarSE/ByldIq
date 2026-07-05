import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ConversionExperience } from "./ConversionExperience";

const meta = {
  title: "Homepage/ConversionExperience",
  component: ConversionExperience,
} satisfies Meta<typeof ConversionExperience>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
