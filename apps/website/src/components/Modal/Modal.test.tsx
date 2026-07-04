import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "@/components/Button";

import { Modal } from "./Modal";

function ControlledModal({ onOpenChange }: { onOpenChange: (open: boolean) => void }) {
  const [open, setOpen] = useState(true);
  return (
    <Modal
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        onOpenChange(next);
      }}
      title="Book a discovery call"
      description="Choose a time that works for your team."
      footer={<Button size="sm">Confirm</Button>}
    >
      <p>We&apos;ll review your project beforehand.</p>
    </Modal>
  );
}

describe("Modal", () => {
  it("renders title, description, and content when open", () => {
    render(<ControlledModal onOpenChange={() => {}} />);
    expect(screen.getByRole("dialog", { name: "Book a discovery call" })).toBeInTheDocument();
    expect(screen.getByText("Choose a time that works for your team.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
  });

  it("closes on the close button and reports the change", async () => {
    const onOpenChange = vi.fn();
    render(<ControlledModal onOpenChange={onOpenChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("closes on Escape", async () => {
    const onOpenChange = vi.fn();
    render(<ControlledModal onOpenChange={onOpenChange} />);
    await userEvent.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("traps focus inside the dialog", async () => {
    render(<ControlledModal onOpenChange={() => {}} />);
    const dialog = screen.getByRole("dialog", { name: "Book a discovery call" });
    // Tab all the way around — focus should never leave the dialog.
    for (let i = 0; i < 5; i++) {
      await userEvent.tab();
      expect(dialog).toContainElement(document.activeElement as HTMLElement);
    }
  });
});
