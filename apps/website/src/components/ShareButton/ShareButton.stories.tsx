import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ShareButton } from "./ShareButton";

// `ToastProvider` is mounted globally (see `.storybook/preview.tsx` ->
// `StorybookProviders`) — a second, local one here duplicated the Sonner
// toast region and produced a real axe `landmark-unique` violation (two
// `role="region" aria-label="Notifications (F8)"` landmarks in the same
// document). See `Toast.stories.tsx` for the same note.
const meta = {
  title: "Foundation/ShareButton",
  component: ShareButton,
  args: {
    title: "From idea to a funded MVP in nine weeks.",
    url: "https://byldiq.com/work/fieldnote-mvp",
  },
} satisfies Meta<typeof ShareButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
