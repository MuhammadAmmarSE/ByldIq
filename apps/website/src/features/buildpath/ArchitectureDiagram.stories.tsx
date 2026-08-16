import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ArchitectureDiagram } from "./ArchitectureDiagram";

const meta = {
  title: "BuildPath/ArchitectureDiagram",
  component: ArchitectureDiagram,
} satisfies Meta<typeof ArchitectureDiagram>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
