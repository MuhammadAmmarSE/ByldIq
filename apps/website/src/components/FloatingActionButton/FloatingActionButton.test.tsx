import { Sparkles } from "lucide-react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FloatingActionButton } from "./FloatingActionButton";

describe("FloatingActionButton", () => {
  it("uses the label as its only accessible name", () => {
    render(<FloatingActionButton icon={Sparkles} label="Ask Byld" />);
    expect(screen.getByRole("button", { name: "Ask Byld" })).toBeInTheDocument();
  });

  it("responds to click", async () => {
    const onClick = vi.fn();
    render(<FloatingActionButton icon={Sparkles} label="Ask Byld" onClick={onClick} />);
    await userEvent.click(screen.getByRole("button", { name: "Ask Byld" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("positions itself bottom-left when requested", () => {
    render(<FloatingActionButton icon={Sparkles} label="Ask Byld" position="bottom-left" />);
    expect(screen.getByRole("button", { name: "Ask Byld" })).toHaveClass("left-6");
  });

  it("clears MobileNav's fixed bottom dock on mobile, dropping to bottom-6 at lg", () => {
    render(<FloatingActionButton icon={Sparkles} label="Ask Byld" />);
    expect(screen.getByRole("button", { name: "Ask Byld" })).toHaveClass(
      "bottom-24",
      "lg:bottom-6",
    );
  });
});
