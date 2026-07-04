import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("accepts typed input", async () => {
    render(<Textarea aria-label="Project description" />);
    const textarea = screen.getByRole("textbox", { name: "Project description" });
    await userEvent.type(textarea, "From validation to launch.");
    expect(textarea).toHaveValue("From validation to launch.");
  });

  it("marks itself invalid via aria-invalid", () => {
    render(<Textarea aria-label="Description" invalid />);
    expect(screen.getByRole("textbox", { name: "Description" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });
});
