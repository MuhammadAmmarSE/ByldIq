import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Drawer } from "./Drawer";

function ControlledDrawer({ onOpenChange }: { onOpenChange: (open: boolean) => void }) {
  const [open, setOpen] = useState(true);
  return (
    <Drawer
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        onOpenChange(next);
      }}
      title="Filter projects"
    >
      <p>Choose an industry and technology to narrow results.</p>
    </Drawer>
  );
}

describe("Drawer", () => {
  it("renders its title and content when open", () => {
    render(<ControlledDrawer onOpenChange={() => {}} />);
    expect(screen.getByRole("dialog", { name: "Filter projects" })).toBeInTheDocument();
    expect(
      screen.getByText("Choose an industry and technology to narrow results."),
    ).toBeInTheDocument();
  });

  it("closes on the close button", async () => {
    const onOpenChange = vi.fn();
    render(<ControlledDrawer onOpenChange={onOpenChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("closes on Escape", async () => {
    const onOpenChange = vi.fn();
    render(<ControlledDrawer onOpenChange={onOpenChange} />);
    await userEvent.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
