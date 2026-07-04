import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/Button";

import { Modal } from "./Modal";

const meta = {
  title: "Foundation/Modal",
  component: Modal,
  args: { open: false, onOpenChange: () => {}, title: "Modal" },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    function DefaultModal() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>Book Discovery</Button>
          <Modal
            open={open}
            onOpenChange={setOpen}
            title="Book a discovery call"
            description="Choose a time that works for your team — no pressure, just a conversation."
            footer={
              <>
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Not now
                </Button>
                <Button onClick={() => setOpen(false)}>Confirm</Button>
              </>
            }
          >
            <p className="text-foreground text-sm">
              We&apos;ll review your project beforehand and come prepared with thoughtful questions.
            </p>
          </Modal>
        </>
      );
    }
    return <DefaultModal />;
  },
};

export const WithoutFooter: Story = {
  render: () => {
    function NoFooterModal() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>Show details</Button>
          <Modal open={open} onOpenChange={setOpen} title="Roadmap ready">
            <p className="text-foreground text-sm">Your personalized roadmap is ready to view.</p>
          </Modal>
        </>
      );
    }
    return <NoFooterModal />;
  },
};
