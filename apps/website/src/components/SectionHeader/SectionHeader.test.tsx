import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SectionHeader } from "./SectionHeader";

describe("SectionHeader", () => {
  it("renders the heading and description", () => {
    render(
      <SectionHeader
        heading="Engineering Success Stories."
        description="Every product represents a business challenge solved through thoughtful engineering."
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Engineering Success Stories." }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Every product represents a business challenge solved through thoughtful engineering.",
      ),
    ).toBeInTheDocument();
  });

  it("renders an eyebrow badge when provided", () => {
    render(
      <SectionHeader eyebrow="Startup Journey" heading="Build products investors believe in." />,
    );
    expect(screen.getByText("Startup Journey")).toBeInTheDocument();
  });

  it("renders actions alongside the heading", () => {
    render(
      <SectionHeader
        heading="Playbooks"
        actions={<button type="button">Explore Playbooks</button>}
      />,
    );
    expect(screen.getByRole("button", { name: "Explore Playbooks" })).toBeInTheDocument();
  });

  it("defaults to an h2 heading, overridable via headingVariant/headingAs", () => {
    const { rerender } = render(<SectionHeader heading="Default" />);
    expect(screen.getByRole("heading", { level: 2, name: "Default" })).toBeInTheDocument();

    rerender(<SectionHeader heading="Page title" headingVariant="display" headingAs="h1" />);
    expect(screen.getByRole("heading", { level: 1, name: "Page title" })).toBeInTheDocument();
  });
});
