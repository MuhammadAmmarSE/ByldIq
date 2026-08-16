import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CodeBlock } from "./CodeBlock";

describe("CodeBlock", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("renders the filename and language label", () => {
    render(<CodeBlock code="const a = 1;" language="typescript" filename="example.ts" />);
    expect(screen.getByText("example.ts")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("omits the filename when none is given", () => {
    render(<CodeBlock code="const a = 1;" language="typescript" />);
    expect(screen.queryByText("example.ts")).not.toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("renders one line number per source line", () => {
    const { container } = render(
      <CodeBlock code={"line one\nline two\nline three"} language="text" />,
    );
    const lineEls = container.querySelectorAll("[data-line-number]");
    expect(lineEls).toHaveLength(3);
    expect(lineEls[0]).toHaveAttribute("data-line-number", "1");
    expect(lineEls[2]).toHaveAttribute("data-line-number", "3");
  });

  it("highlights the requested line", () => {
    const { container } = render(
      <CodeBlock code={"a\nb\nc"} language="text" highlightLines={[2]} />,
    );
    const line2 = container.querySelector('[data-line-number="2"]');
    const line1 = container.querySelector('[data-line-number="1"]');
    expect(line2?.className).toContain("bg-accent/10");
    expect(line1?.className).not.toContain("bg-accent/10");
  });

  it("copies the code to the clipboard and shows confirmation, then reverts", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    render(<CodeBlock code="const a = 1;" language="typescript" />);

    await user.click(screen.getByRole("button", { name: "Copy" }));
    expect(writeText).toHaveBeenCalledWith("const a = 1;");
    expect(await screen.findByRole("button", { name: "Copied" })).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: "Copy" }, { timeout: 3000 }),
    ).toBeInTheDocument();
  });

  it("collapses long code behind a 'Show N more lines' toggle, and expands on click", async () => {
    const user = userEvent.setup();
    const longCode = Array.from({ length: 20 }, (_, index) => `line ${index + 1}`).join("\n");
    const { container } = render(
      <CodeBlock code={longCode} language="text" collapseAfterLines={16} />,
    );

    expect(container.querySelectorAll("[data-line-number]")).toHaveLength(16);
    expect(screen.getByRole("button", { name: "Show 4 more lines" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Show 4 more lines" }));

    expect(container.querySelectorAll("[data-line-number]")).toHaveLength(20);
    expect(screen.getByRole("button", { name: "Show less" })).toBeInTheDocument();
  });

  it("never collapses code at or under the threshold", () => {
    const code = Array.from({ length: 16 }, (_, index) => `line ${index + 1}`).join("\n");
    render(<CodeBlock code={code} language="text" collapseAfterLines={16} />);
    expect(screen.queryByRole("button", { name: /show/i })).not.toBeInTheDocument();
  });
});
