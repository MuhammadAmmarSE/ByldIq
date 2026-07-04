import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import type { NavItem } from "@/types/navigation";

import { Navbar } from "./Navbar";

const items: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "Startup", href: "/solutions/startup" },
      { label: "Enterprise", href: "/solutions/enterprise" },
      { label: "Commerce", href: "/solutions/commerce" },
    ],
  },
  { label: "Resources", href: "/resources" },
];

const meta = {
  title: "Foundation/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  render: () => (
    <div className="bg-background min-h-screen">
      <Navbar />
      <p className="text-muted p-6 text-sm">
        No items populated yet — see CLAUDE.md Part 8, information architecture is a content
        decision for a later milestone.
      </p>
    </div>
  ),
};

export const WithItems: Story = {
  render: () => (
    <div className="bg-background min-h-[150vh]">
      <Navbar items={items} />
      <p className="text-muted p-6 text-sm">Scroll down to see the navbar respond.</p>
    </div>
  ),
};
