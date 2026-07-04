import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/Button";

import { useToast } from "./Toast";

/**
 * `ToastProvider` is mounted globally (see `.storybook/preview.tsx` ->
 * `StorybookProviders`), so stories only need `useToast()` — there's no
 * standalone `<Toast>` component to render directly.
 */
function ToastDemo() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={() =>
          toast({ title: "Roadmap ready", description: "Let's review the next steps together." })
        }
      >
        Default
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: "Changes saved",
            description: "Your BuildPath progress is saved automatically.",
            variant: "success",
          })
        }
      >
        Success
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: "Session expiring soon",
            description: "Save your progress to avoid losing it.",
            variant: "warning",
          })
        }
      >
        Warning
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          toast({
            title: "Something went wrong",
            description: "We couldn't generate your roadmap. Please try again.",
            variant: "danger",
          })
        }
      >
        Danger
      </Button>
    </div>
  );
}

const meta = {
  title: "Foundation/Toast",
  component: ToastDemo,
} satisfies Meta<typeof ToastDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
