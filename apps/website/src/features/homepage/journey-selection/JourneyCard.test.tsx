import { render, screen } from "@testing-library/react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import type { ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";

import { JOURNEY_DEFINITIONS, type JourneyDefinition } from "./data/journeys";
import { JourneyCard } from "./JourneyCard";

function requireFirstJourney(): JourneyDefinition {
  const [first] = JOURNEY_DEFINITIONS;
  if (!first) throw new Error("JOURNEY_DEFINITIONS must not be empty");
  return first;
}

const startup = requireFirstJourney();

function renderCard(props: Partial<ComponentProps<typeof JourneyCard>> = {}) {
  return render(
    <RadioGroupPrimitive.Root aria-label="Journey">
      <JourneyCard journey={startup} isSelected={false} isAnySelected={false} {...props} />
    </RadioGroupPrimitive.Root>,
  );
}

describe("JourneyCard", () => {
  it("renders the journey's title, description, and examples", () => {
    renderCard();
    expect(screen.getByText(startup.title)).toBeInTheDocument();
    expect(screen.getByText(startup.description)).toBeInTheDocument();
    for (const example of startup.examples) {
      expect(screen.getByText(example)).toBeInTheDocument();
    }
  });

  it("calls onHover when the pointer enters the card", () => {
    const onHover = vi.fn();
    renderCard({ onHover });

    // React implements `onPointerEnter` on top of the native, bubbling
    // `pointerover` event — dispatching `pointerenter` directly (which
    // doesn't bubble) wouldn't reach React's delegated listener.
    screen.getByRole("radio").dispatchEvent(new PointerEvent("pointerover", { bubbles: true }));
    expect(onHover).toHaveBeenCalledWith(startup.id);
  });
});
