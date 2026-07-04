import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Label } from "@/components/Label";

import { RadioGroup, RadioGroupItem } from "./Radio";

function Journeys({ onValueChange }: { onValueChange?: (value: string) => void }) {
  return (
    <RadioGroup aria-label="Journey" onValueChange={onValueChange}>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="startup" id="startup" />
        <Label htmlFor="startup">Startup</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="enterprise" id="enterprise" />
        <Label htmlFor="enterprise">Enterprise</Label>
      </div>
    </RadioGroup>
  );
}

describe("RadioGroup", () => {
  it("selects one option at a time", async () => {
    const onValueChange = vi.fn();
    render(<Journeys onValueChange={onValueChange} />);
    await userEvent.click(screen.getByRole("radio", { name: "Startup" }));
    expect(onValueChange).toHaveBeenCalledWith("startup");
  });

  it("moves focus between options with arrow keys (roving tabindex)", async () => {
    render(<Journeys />);
    await userEvent.tab();
    expect(screen.getByRole("radio", { name: "Startup" })).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(screen.getByRole("radio", { name: "Enterprise" })).toHaveFocus();
  });
});
