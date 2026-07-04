import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./Accordion";

function FaqAccordion() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="discovery">
        <AccordionTrigger>What happens after booking?</AccordionTrigger>
        <AccordionContent>We&apos;ll review your project beforehand.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="nda">
        <AccordionTrigger>Can you sign an NDA?</AccordionTrigger>
        <AccordionContent>Yes, always.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

describe("Accordion", () => {
  it("expands an item on click and collapses it on a second click", async () => {
    render(<FaqAccordion />);
    const trigger = screen.getByRole("button", { name: "What happens after booking?" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("We'll review your project beforehand.")).toBeInTheDocument();

    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("only allows one open item at a time in single mode", async () => {
    render(<FaqAccordion />);
    await userEvent.click(screen.getByRole("button", { name: "What happens after booking?" }));
    await userEvent.click(screen.getByRole("button", { name: "Can you sign an NDA?" }));

    expect(screen.getByRole("button", { name: "What happens after booking?" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.getByRole("button", { name: "Can you sign an NDA?" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });
});
