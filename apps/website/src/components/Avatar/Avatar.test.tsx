import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("shows the fallback initials when no image is provided", async () => {
    render(<Avatar alt="Byld IQ" fallback="BI" />);
    // Radix mounts the Fallback after an effect, even with delayMs={0}.
    expect(await screen.findByText("BI")).toBeInTheDocument();
  });

  it("applies the requested size classes", () => {
    render(<Avatar alt="Byld IQ" fallback="BI" size="lg" className="test-avatar" />);
    expect(document.querySelector(".test-avatar")).toHaveClass("h-12", "w-12");
  });
});
