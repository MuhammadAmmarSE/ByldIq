import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import type { NavItem } from "@/types/navigation";

import { MobileNav } from "./MobileNav";

const items: NavItem[] = [
  { label: "Work", href: "/work" },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "Startup", href: "/solutions/startup" },
      { label: "Enterprise", href: "/solutions/enterprise" },
    ],
  },
  { label: "Resources", href: "/resources" },
];

const meta = {
  title: "Foundation/MobileNav",
  component: MobileNav,
  args: { open: false, onOpenChange: () => {} },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof MobileNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    function Interactive() {
      const [open, setOpen] = useState(false);
      return (
        <div className="bg-background relative h-[400px]">
          <MobileNav open={open} onOpenChange={setOpen} items={items} />
        </div>
      );
    }
    return <Interactive />;
  },
};

export const DrawerOpen: Story = {
  parameters: {
    // Storybook's theme decorator toggles a class on mount, which (via the
    // global smooth-theme-transition rule in globals.css) briefly animates
    // color on any element mounted at that exact moment — here, the
    // Drawer's freshly-portalled content, since this story starts already
    // open. axe can snapshot mid-transition and see a blended, low-contrast
    // color that never appears once the (sub-300ms) transition settles.
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
  },
  render: () => {
    function Interactive() {
      const [open, setOpen] = useState(true);
      return (
        <div className="bg-background relative h-[400px]">
          <MobileNav open={open} onOpenChange={setOpen} items={items} />
        </div>
      );
    }
    return <Interactive />;
  },
};
