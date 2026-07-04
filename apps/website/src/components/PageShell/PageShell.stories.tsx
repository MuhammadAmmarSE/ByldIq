import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PageShell } from "./PageShell";

const meta = {
  title: "Foundation/PageShell",
  component: PageShell,
  args: { children: null },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof PageShell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <PageShell>
      <div className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-foreground text-3xl font-semibold">Page content</h1>
        <p className="text-muted mt-2">
          PageShell wraps every page with Navbar, Footer, and MobileNav — this is where a
          page&apos;s own content renders.
        </p>
      </div>
    </PageShell>
  ),
};
