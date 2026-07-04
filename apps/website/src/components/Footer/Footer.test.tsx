import { Globe, Mail } from "lucide-react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Footer } from "./Footer";

describe("Footer", () => {
  it("always renders the logo and copyright line", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Byld IQ" })).toHaveAttribute("href", "/");
    expect(
      screen.getByText(`© ${new Date().getFullYear()} Byld IQ. All rights reserved.`),
    ).toBeInTheDocument();
  });

  it("renders columns and their links when provided", () => {
    render(
      <Footer
        columns={[
          { heading: "Solutions", items: [{ label: "Startup", href: "/solutions/startup" }] },
        ]}
      />,
    );
    expect(screen.getByText("Solutions")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Startup" })).toHaveAttribute(
      "href",
      "/solutions/startup",
    );
  });

  it("renders social links with accessible names and safe external attributes", () => {
    render(
      <Footer
        socialLinks={[
          { label: "Website", href: "https://byldiq.com", icon: Globe },
          { label: "Email", href: "mailto:hello@byldiq.com", icon: Mail },
        ]}
      />,
    );
    const website = screen.getByRole("link", { name: "Website" });
    expect(website).toHaveAttribute("target", "_blank");
    expect(website).toHaveAttribute("rel", "noreferrer");
  });
});
