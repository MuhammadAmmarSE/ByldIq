import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Alert } from "./Alert";

describe("Alert", () => {
  it("renders the title and description", () => {
    render(<Alert title="Roadmap ready">Review the next steps together.</Alert>);
    expect(screen.getByText("Roadmap ready")).toBeInTheDocument();
    expect(screen.getByText("Review the next steps together.")).toBeInTheDocument();
  });

  it("uses a polite status role for info and success", () => {
    render(<Alert variant="success" title="Saved" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("uses an assertive alert role for warning and danger", () => {
    render(<Alert variant="danger" title="Something went wrong" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
