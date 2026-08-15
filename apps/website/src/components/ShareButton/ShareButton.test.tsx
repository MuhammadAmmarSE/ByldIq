import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ToastProvider } from "@/components/Toast";

import { ShareButton } from "./ShareButton";

function renderButton(onShare?: () => void) {
  return render(
    <ToastProvider>
      <ShareButton
        title="A case study"
        url="https://example.com/work/a-case-study"
        onShare={onShare}
      />
    </ToastProvider>,
  );
}

describe("ShareButton", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    Reflect.deleteProperty(navigator, "share");
  });

  it("uses the native Web Share API when available", async () => {
    const user = userEvent.setup();
    const mockShare = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "share", { value: mockShare, configurable: true });
    const onShare = vi.fn();

    renderButton(onShare);
    await user.click(screen.getByRole("button", { name: "Share" }));

    expect(mockShare).toHaveBeenCalledWith({
      title: "A case study",
      url: "https://example.com/work/a-case-study",
    });
    expect(onShare).toHaveBeenCalled();
  });

  it("falls back to copying the link and shows a toast when Web Share isn't available", async () => {
    const user = userEvent.setup();
    const mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: mockWriteText },
      configurable: true,
    });
    const onShare = vi.fn();

    renderButton(onShare);
    await user.click(screen.getByRole("button", { name: "Share" }));

    expect(mockWriteText).toHaveBeenCalledWith("https://example.com/work/a-case-study");
    expect(await screen.findByText("Link copied")).toBeInTheDocument();
    expect(onShare).toHaveBeenCalled();
  });

  it("shows an error toast if copying to the clipboard fails", async () => {
    const user = userEvent.setup();
    const mockWriteText = vi.fn().mockRejectedValue(new Error("denied"));
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: mockWriteText },
      configurable: true,
    });

    renderButton();
    await user.click(screen.getByRole("button", { name: "Share" }));

    expect(await screen.findByText("Couldn't copy the link")).toBeInTheDocument();
  });
});
