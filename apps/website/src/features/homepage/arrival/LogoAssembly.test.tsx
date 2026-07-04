import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LogoAssembly } from "./LogoAssembly";

describe("LogoAssembly", () => {
  it("renders an accessible mark labeled Byld IQ", () => {
    render(<LogoAssembly assembled={false} />);
    expect(screen.getByRole("img", { name: "Byld IQ" })).toBeInTheDocument();
  });

  it("renders the same accessible mark once assembled", () => {
    render(<LogoAssembly assembled />);
    expect(screen.getByRole("img", { name: "Byld IQ" })).toBeInTheDocument();
  });
});
