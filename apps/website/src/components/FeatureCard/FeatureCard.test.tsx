import { Rocket } from "lucide-react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FeatureCard } from "./FeatureCard";

describe("FeatureCard", () => {
  it("renders the title and description as static content by default", () => {
    render(
      <FeatureCard
        icon={Rocket}
        title="Fast Deployment"
        description="Ship to production in minutes, not days."
      />,
    );

    expect(screen.getByRole("heading", { name: "Fast Deployment" })).toBeInTheDocument();
    expect(screen.getByText("Ship to production in minutes, not days.")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders as a link when href is provided", () => {
    render(
      <FeatureCard
        icon={Rocket}
        title="Startup Solutions"
        description="MVPs built to validate fast."
        href="/solutions/startup"
      />,
    );

    expect(screen.getByRole("link")).toHaveAttribute("href", "/solutions/startup");
  });

  it("renders a visible CTA label only when both href and ctaLabel are set", () => {
    const { rerender } = render(
      <FeatureCard
        icon={Rocket}
        title="Startup Solutions"
        description="MVPs built to validate fast."
        href="/solutions/startup"
        ctaLabel="Explore Startup Solutions"
      />,
    );
    expect(screen.getByText("Explore Startup Solutions")).toBeInTheDocument();

    rerender(
      <FeatureCard
        icon={Rocket}
        title="Startup Solutions"
        description="MVPs built to validate fast."
        ctaLabel="Explore Startup Solutions"
      />,
    );
    expect(screen.queryByText("Explore Startup Solutions")).not.toBeInTheDocument();
  });

  it("calls onClick when a linked card is clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <FeatureCard
        icon={Rocket}
        title="Startup Solutions"
        description="MVPs built to validate fast."
        href="/solutions/startup"
        onClick={handleClick}
      />,
    );

    await user.click(screen.getByRole("link"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
