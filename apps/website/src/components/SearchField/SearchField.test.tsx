import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SearchField } from "./SearchField";

function ControlledSearchField({ onClear }: { onClear: () => void }) {
  const [value, setValue] = useState("");
  return (
    <SearchField
      aria-label="Search knowledge center"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onClear={() => {
        setValue("");
        onClear();
      }}
    />
  );
}

describe("SearchField", () => {
  it("accepts typed input", async () => {
    render(<ControlledSearchField onClear={() => {}} />);
    const input = screen.getByRole("searchbox", { name: "Search knowledge center" });
    await userEvent.type(input, "architecture");
    expect(input).toHaveValue("architecture");
  });

  it("shows a clear button only once there's a value, and clears on click", async () => {
    const onClear = vi.fn();
    render(<ControlledSearchField onClear={onClear} />);
    expect(screen.queryByRole("button", { name: "Clear search" })).not.toBeInTheDocument();

    const input = screen.getByRole("searchbox", { name: "Search knowledge center" });
    await userEvent.type(input, "architecture");

    const clearButton = screen.getByRole("button", { name: "Clear search" });
    await userEvent.click(clearButton);
    expect(onClear).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue("");
  });
});
