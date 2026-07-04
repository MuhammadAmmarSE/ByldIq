import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Breadcrumb } from "./Breadcrumb";

const items = [
  { label: "Solutions", href: "/solutions" },
  { label: "AI", href: "/solutions/ai" },
  { label: "Conversational Systems" },
];

describe("Breadcrumb", () => {
  it("renders every item as a link except the current page", () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByRole("link", { name: "Solutions" })).toHaveAttribute("href", "/solutions");
    expect(screen.getByRole("link", { name: "AI" })).toHaveAttribute("href", "/solutions/ai");
    expect(screen.queryByRole("link", { name: "Conversational Systems" })).not.toBeInTheDocument();
  });

  it("marks the current page with aria-current", () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByText("Conversational Systems")).toHaveAttribute("aria-current", "page");
  });

  it("exposes an accessible navigation landmark", () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
  });
});
