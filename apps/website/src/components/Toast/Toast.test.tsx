import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Button } from "@/components/Button";

import { ToastProvider, useToast } from "./Toast";

function ToastTrigger() {
  const { toast } = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          title: "Roadmap ready",
          description: "Let's review the next steps together.",
        })
      }
    >
      Generate Roadmap
    </Button>
  );
}

describe("ToastProvider / useToast", () => {
  it("shows a toast when triggered", async () => {
    render(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Generate Roadmap" }));
    expect(await screen.findByText("Roadmap ready")).toBeInTheDocument();
    expect(screen.getByText("Let's review the next steps together.")).toBeInTheDocument();
  });

  it("dismisses the toast on close", async () => {
    render(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Generate Roadmap" }));
    await screen.findByText("Roadmap ready");
    await userEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(screen.queryByText("Roadmap ready")).not.toBeInTheDocument();
  });

  it("throws when useToast is called outside a ToastProvider", () => {
    function Broken() {
      useToast();
      return null;
    }
    expect(() => render(<Broken />)).toThrow("useToast must be used within a ToastProvider");
  });
});
