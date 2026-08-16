import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AiFeatureSuggestions } from "./AiFeatureSuggestions";

const meta = {
  title: "BuildPath/AiFeatureSuggestions",
  component: AiFeatureSuggestions,
} satisfies Meta<typeof AiFeatureSuggestions>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
