import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";

function SolutionTabs() {
  return (
    <Tabs defaultValue="startup">
      <TabsList aria-label="Solutions">
        <TabsTrigger value="startup">Startup</TabsTrigger>
        <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
      </TabsList>
      <TabsContent value="startup">Startup content</TabsContent>
      <TabsContent value="enterprise">Enterprise content</TabsContent>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("shows only the active tab's content", () => {
    render(<SolutionTabs />);
    expect(screen.getByText("Startup content")).toBeInTheDocument();
    expect(screen.queryByText("Enterprise content")).not.toBeInTheDocument();
  });

  it("switches content on click", async () => {
    render(<SolutionTabs />);
    await userEvent.click(screen.getByRole("tab", { name: "Enterprise" }));
    expect(screen.getByText("Enterprise content")).toBeInTheDocument();
    expect(screen.queryByText("Startup content")).not.toBeInTheDocument();
  });

  it("switches tabs with arrow keys", async () => {
    render(<SolutionTabs />);
    await userEvent.tab();
    expect(screen.getByRole("tab", { name: "Startup" })).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Enterprise" })).toHaveFocus();
    expect(screen.getByText("Enterprise content")).toBeInTheDocument();
  });
});
