import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders its label", () => {
    render(<Badge>Startup Journey</Badge>);
    expect(screen.getByText("Startup Journey")).toBeInTheDocument();
  });

  it("applies the requested variant's classes", () => {
    render(<Badge variant="danger">Deprecated</Badge>);
    expect(screen.getByText("Deprecated")).toHaveClass("bg-danger");
  });
});
