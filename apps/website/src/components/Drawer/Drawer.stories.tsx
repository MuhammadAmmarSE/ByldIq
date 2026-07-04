import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/Button";

import { Drawer } from "./Drawer";

const meta = {
  title: "Foundation/Drawer",
  component: Drawer,
  args: { open: false, onOpenChange: () => {}, title: "Drawer" },
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FromRight: Story = {
  render: () => {
    function RightDrawer() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>Filter Projects</Button>
          <Drawer
            open={open}
            onOpenChange={setOpen}
            title="Filter projects"
            description="Narrow results by industry and technology."
            footer={<Button onClick={() => setOpen(false)}>Apply Filters</Button>}
          >
            <p className="text-foreground text-sm">Filter controls would render here.</p>
          </Drawer>
        </>
      );
    }
    return <RightDrawer />;
  },
};

export const FromLeft: Story = {
  render: () => {
    function LeftDrawer() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>Open Menu</Button>
          <Drawer open={open} onOpenChange={setOpen} title="Menu" side="left">
            <p className="text-foreground text-sm">Navigation links would render here.</p>
          </Drawer>
        </>
      );
    }
    return <LeftDrawer />;
  },
};
