import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Card } from "./Card";

describe("Card", () => {
  it("composes Header, Content, and Footer", () => {
    render(
      <Card>
        <Card.Header>
          <h3>Startup Product Engineering</h3>
        </Card.Header>
        <Card.Content>
          <p>From validation to launch.</p>
        </Card.Content>
        <Card.Footer>
          <button type="button">Explore</button>
        </Card.Footer>
      </Card>,
    );

    expect(screen.getByText("Startup Product Engineering")).toBeInTheDocument();
    expect(screen.getByText("From validation to launch.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Explore" })).toBeInTheDocument();
  });
});
