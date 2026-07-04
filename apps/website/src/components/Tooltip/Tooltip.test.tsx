import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Button } from "@/components/Button";

import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("shows its content on hover", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Book a discovery call" delayDuration={0}>
        <Button>Talk to Byld</Button>
      </Tooltip>,
    );
    await user.hover(screen.getByRole("button", { name: "Talk to Byld" }));
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Book a discovery call");
  });

  it("shows its content on keyboard focus", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Book a discovery call" delayDuration={0}>
        <Button>Talk to Byld</Button>
      </Tooltip>,
    );
    await user.tab();
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Book a discovery call");
  });
});
