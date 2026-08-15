import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { PricingCard } from "./PricingCard";

describe("PricingCard", () => {
  it("renders the tier, price, and features", () => {
    render(
      <PricingCard
        tier="Growth"
        price="$4,500/mo"
        features={["Weekly architecture reviews", "Priority support"]}
        ctaLabel="Talk to Byld"
        onCtaClick={vi.fn()}
      />,
    );

    expect(screen.getByRole("heading", { name: "Growth" })).toBeInTheDocument();
    expect(screen.getByText("$4,500/mo")).toBeInTheDocument();
    expect(screen.getByText("Weekly architecture reviews")).toBeInTheDocument();
    expect(screen.getByText("Priority support")).toBeInTheDocument();
  });

  it("calls onCtaClick when the CTA is a button", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <PricingCard
        tier="Starter"
        price="$1,500/mo"
        features={["Async support"]}
        ctaLabel="Get Started"
        onCtaClick={handleClick}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Get Started" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders the CTA as a link when ctaHref is provided", () => {
    render(
      <PricingCard
        tier="Enterprise"
        price="Custom"
        features={["Dedicated architecture team"]}
        ctaLabel="Contact Sales"
        ctaHref="/contact"
      />,
    );

    expect(screen.getByRole("link", { name: "Contact Sales" })).toHaveAttribute("href", "/contact");
  });

  it("shows a Recommended badge when featured", () => {
    render(
      <PricingCard
        tier="Growth"
        price="$4,500/mo"
        features={["Weekly architecture reviews"]}
        ctaLabel="Talk to Byld"
        featured
      />,
    );

    expect(screen.getByText("Recommended")).toBeInTheDocument();
  });
});
