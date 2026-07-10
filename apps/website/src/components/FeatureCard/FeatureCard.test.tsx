import { Rocket } from "lucide-react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

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
});
