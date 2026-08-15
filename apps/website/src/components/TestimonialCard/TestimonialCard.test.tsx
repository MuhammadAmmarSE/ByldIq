import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TestimonialCard } from "./TestimonialCard";

describe("TestimonialCard", () => {
  it("renders the quote, author name, and role", () => {
    render(
      <TestimonialCard
        quote="BuildPath turned a vague idea into a roadmap we actually trusted."
        authorName="Priya Shah"
        authorRole="CTO, Nova Commerce"
      />,
    );

    expect(
      screen.getByText(/BuildPath turned a vague idea into a roadmap we actually trusted\./),
    ).toBeInTheDocument();
    expect(screen.getByText("Priya Shah")).toBeInTheDocument();
    expect(screen.getByText("CTO, Nova Commerce")).toBeInTheDocument();
  });

  it("derives avatar initials from the author's first and last name", async () => {
    render(<TestimonialCard quote="Great work." authorName="Priya Shah" authorRole="CTO" />);
    // Radix mounts Avatar.Fallback after an effect, even with delayMs={0}.
    expect(await screen.findByText("PS")).toBeInTheDocument();
  });

  it("derives a single initial for a one-word name", async () => {
    render(<TestimonialCard quote="Great work." authorName="Madonna" authorRole="Founder" />);
    expect(await screen.findByText("M")).toBeInTheDocument();
  });
});
