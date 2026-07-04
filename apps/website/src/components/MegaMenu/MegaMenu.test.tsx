import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import type { NavItem } from "@/types/navigation";

import { MegaMenu } from "./MegaMenu";

const solutionsItem: NavItem = {
  label: "Solutions",
  href: "/solutions",
  children: [
    { label: "Startup", href: "/solutions/startup" },
    { label: "Enterprise", href: "/solutions/enterprise" },
  ],
};

describe("MegaMenu", () => {
  it("opens the panel on click and lists every child link", async () => {
    render(<MegaMenu item={solutionsItem} />);
    expect(screen.queryByRole("link", { name: "Startup" })).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Solutions" }));
    expect(screen.getByRole("link", { name: "Startup" })).toHaveAttribute(
      "href",
      "/solutions/startup",
    );
    expect(screen.getByRole("link", { name: "Enterprise" })).toHaveAttribute(
      "href",
      "/solutions/enterprise",
    );
  });

  it("closes on Escape", async () => {
    render(<MegaMenu item={solutionsItem} />);
    await userEvent.click(screen.getByRole("button", { name: "Solutions" }));
    await screen.findByRole("link", { name: "Startup" });
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("link", { name: "Startup" })).not.toBeInTheDocument();
  });
});
