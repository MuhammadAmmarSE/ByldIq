import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CaseStudySidebar } from "./CaseStudySidebar";

const meta = {
  title: "CaseStudies/CaseStudySidebar",
  component: CaseStudySidebar,
  args: { slug: "fieldnote-mvp" },
} satisfies Meta<typeof CaseStudySidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
