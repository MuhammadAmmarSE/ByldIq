import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/Button";

import { SectionHeader } from "./SectionHeader";

const meta = {
  title: "Foundation/SectionHeader",
  component: SectionHeader,
} satisfies Meta<typeof SectionHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    heading: "Engineering Success Stories.",
    description:
      "Every product represents a business challenge solved through thoughtful engineering.",
  },
};

export const WithEyebrow: Story = {
  args: {
    eyebrow: "Startup Journey",
    heading: "Build products investors believe in.",
    description: "Transform your idea into a scalable digital product.",
  },
};

export const WithActions: Story = {
  args: {
    heading: "Prefer a guided path?",
    actions: <Button variant="outline">Explore Learning Paths</Button>,
  },
};

export const Centered: Story = {
  args: {
    eyebrow: "Knowledge Center",
    heading: "Engineering Knowledge That Lasts.",
    description:
      "Practical guides on product strategy, architecture, AI, accessibility, and commerce.",
    align: "center",
  },
};

export const PageTitle: Story = {
  args: {
    heading: "Playbooks",
    headingVariant: "display",
    description:
      "Practical, checklist-style guides product teams can put into practice immediately.",
  },
};
