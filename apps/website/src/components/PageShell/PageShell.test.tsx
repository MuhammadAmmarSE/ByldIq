import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { CommandPaletteProvider } from "@/components/CommandPalette";

import { PageShell } from "./PageShell";

function renderPageShell() {
  return render(
    <CommandPaletteProvider>
      <PageShell>
        <p>Page content</p>
      </PageShell>
    </CommandPaletteProvider>,
  );
}

describe("PageShell", () => {
  it("renders the navbar, page content, footer, and mobile nav dock", () => {
    renderPageShell();
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByText("Page content")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Mobile" })).toBeInTheDocument();
  });

  it("shares mobile menu state between Navbar's trigger and MobileNav's drawer", async () => {
    renderPageShell();
    expect(screen.queryByRole("dialog", { name: "Menu" })).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(await screen.findByRole("dialog", { name: "Menu" })).toBeInTheDocument();
  });
});
