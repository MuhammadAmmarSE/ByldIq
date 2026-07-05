import { ArrowRight } from "lucide-react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./Button";

describe("Button", () => {
  it("renders children and responds to click", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Book Discovery</Button>);
    await userEvent.click(screen.getByRole("button", { name: "Book Discovery" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is keyboard operable", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Explore</Button>);
    await userEvent.tab();
    expect(screen.getByRole("button", { name: "Explore" })).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disables interaction and announces busy state while loading", () => {
    render(<Button loading>Saving</Button>);
    const button = screen.getByRole("button", { name: /saving/i });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Disabled" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders the icon props as decorative", () => {
    const { container } = render(<Button iconLeft={ArrowRight}>Continue</Button>);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("renders the single child directly when asChild is set", () => {
    render(
      <Button asChild>
        <a href="https://example.com">Explore Solutions</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Explore Solutions" });
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe("A");
  });
});
