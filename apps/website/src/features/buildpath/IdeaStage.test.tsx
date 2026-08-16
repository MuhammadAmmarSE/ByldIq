import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { BuildPathStoreProvider, useBuildPathStore } from "@/providers/BuildPathStoreProvider";

import { IdeaStage } from "./IdeaStage";

function Harness() {
  const projectTypes = useBuildPathStore((state) => state.projectTypes);
  const accomplish = useBuildPathStore((state) => state.discovery.accomplish);
  return (
    <>
      <IdeaStage />
      <p data-testid="project-types">{projectTypes.join(", ")}</p>
      <p data-testid="accomplish">{accomplish}</p>
    </>
  );
}

function renderIdeaStage() {
  return render(
    <BuildPathStoreProvider>
      <Harness />
    </BuildPathStoreProvider>,
  );
}

describe("IdeaStage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("toggles a project type on and off", async () => {
    const user = userEvent.setup();
    renderIdeaStage();

    const mvpButton = screen.getByRole("button", { name: "MVP" });
    await user.click(mvpButton);
    expect(mvpButton).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByTestId("project-types")).toHaveTextContent("MVP");

    await user.click(mvpButton);
    expect(mvpButton).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByTestId("project-types")).toHaveTextContent("");
  });

  it("supports selecting more than one project type", async () => {
    const user = userEvent.setup();
    renderIdeaStage();

    await user.click(screen.getByRole("button", { name: "MVP" }));
    await user.click(screen.getByRole("button", { name: "AI Product" }));

    expect(screen.getByTestId("project-types")).toHaveTextContent("MVP, AI Product");
  });

  it("writes the idea description into discovery.accomplish", async () => {
    const user = userEvent.setup();
    renderIdeaStage();

    await user.type(screen.getByLabelText(/what are you building/i), "A tool for something");

    expect(screen.getByTestId("accomplish")).toHaveTextContent("A tool for something");
  });
});
