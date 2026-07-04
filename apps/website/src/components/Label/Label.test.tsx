import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Input } from "@/components/Input";

import { Label } from "./Label";

describe("Label", () => {
  it("focuses the associated control when clicked", async () => {
    render(
      <>
        <Label htmlFor="company">Company name</Label>
        <Input id="company" />
      </>,
    );
    await userEvent.click(screen.getByText("Company name"));
    expect(screen.getByLabelText("Company name")).toHaveFocus();
  });
});
