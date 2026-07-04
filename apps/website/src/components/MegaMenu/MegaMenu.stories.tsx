import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import type { NavItem } from "@/types/navigation";

import { MegaMenu } from "./MegaMenu";

const solutionsItem: NavItem = {
  label: "Solutions",
  href: "/solutions",
  children: [
    { label: "Startup", href: "/solutions/startup" },
    { label: "Enterprise", href: "/solutions/enterprise" },
    { label: "Commerce", href: "/solutions/commerce" },
    { label: "Artificial Intelligence", href: "/solutions/ai" },
    { label: "Platform", href: "/solutions/platform" },
    { label: "Automation", href: "/solutions/automation" },
  ],
};

const meta = {
  title: "Foundation/MegaMenu",
  component: MegaMenu,
  args: { item: solutionsItem },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof MegaMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
