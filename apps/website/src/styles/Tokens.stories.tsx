import type { Meta, StoryObj } from "@storybook/nextjs-vite";

// Tailwind's compiler statically scans for literal class name strings, so
// every class used below is spelled out in full — a template literal like
// `bg-${token}` would never be detected and would silently emit no CSS.

const COLOR_SWATCHES = [
  { token: "--color-background", className: "bg-background" },
  { token: "--color-foreground", className: "bg-foreground" },
  { token: "--color-surface", className: "bg-surface" },
  { token: "--color-surface-raised", className: "bg-surface-raised" },
  { token: "--color-border", className: "bg-border" },
  { token: "--color-muted", className: "bg-muted" },
  { token: "--color-accent", className: "bg-accent" },
  { token: "--color-accent-foreground", className: "bg-accent-foreground" },
  { token: "--color-danger", className: "bg-danger" },
  { token: "--color-success", className: "bg-success" },
  { token: "--color-warning", className: "bg-warning" },
] as const;

const TYPE_SCALE = [
  { token: "text-xs", className: "text-xs" },
  { token: "text-sm", className: "text-sm" },
  { token: "text-base", className: "text-base" },
  { token: "text-lg", className: "text-lg" },
  { token: "text-xl", className: "text-xl" },
  { token: "text-2xl", className: "text-2xl" },
  { token: "text-3xl", className: "text-3xl" },
  { token: "text-4xl", className: "text-4xl" },
  { token: "text-5xl", className: "text-5xl" },
  { token: "text-6xl", className: "text-6xl" },
] as const;

const RADII = [
  { token: "rounded-sm", className: "rounded-sm" },
  { token: "rounded-md", className: "rounded-md" },
  { token: "rounded-lg", className: "rounded-lg" },
  { token: "rounded-xl", className: "rounded-xl" },
  { token: "rounded-full", className: "rounded-full" },
] as const;

const SHADOWS = [
  { token: "shadow-sm", className: "shadow-sm" },
  { token: "shadow-md", className: "shadow-md" },
  { token: "shadow-lg", className: "shadow-lg" },
  { token: "shadow-xl", className: "shadow-xl" },
] as const;

function ColorSwatches() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {COLOR_SWATCHES.map(({ token, className }) => (
        <div key={token} className="space-y-2">
          <div className={`border-border h-16 rounded-md border ${className}`} />
          <p className="text-muted font-mono text-xs">{token}</p>
        </div>
      ))}
    </div>
  );
}

function TypeScale() {
  return (
    <div className="space-y-3">
      {TYPE_SCALE.map(({ token, className }) => (
        <div key={token} className="flex items-baseline gap-4">
          <span className="text-muted w-16 shrink-0 font-mono text-xs">{token}</span>
          <span className={`${className} text-foreground`}>Byld IQ engineers products.</span>
        </div>
      ))}
    </div>
  );
}

function RadiusScale() {
  return (
    <div className="flex flex-wrap gap-4">
      {RADII.map(({ token, className }) => (
        <div key={token} className="space-y-2 text-center">
          <div className={`border-border bg-surface-raised size-16 border ${className}`} />
          <p className="text-muted font-mono text-xs">{token}</p>
        </div>
      ))}
    </div>
  );
}

function ShadowScale() {
  return (
    <div className="flex flex-wrap gap-8 p-4">
      {SHADOWS.map(({ token, className }) => (
        <div key={token} className="space-y-2 text-center">
          <div className={`bg-surface size-16 rounded-md ${className}`} />
          <p className="text-muted font-mono text-xs">{token}</p>
        </div>
      ))}
    </div>
  );
}

function DesignTokens() {
  return (
    <div className="bg-background text-foreground space-y-10 p-8">
      <section>
        <h2 className="mb-4 text-lg font-medium">Color</h2>
        <ColorSwatches />
      </section>
      <section>
        <h2 className="mb-4 text-lg font-medium">Type scale</h2>
        <TypeScale />
      </section>
      <section>
        <h2 className="mb-4 text-lg font-medium">Radius</h2>
        <RadiusScale />
      </section>
      <section>
        <h2 className="mb-4 text-lg font-medium">Shadow</h2>
        <ShadowScale />
      </section>
    </div>
  );
}

const meta = {
  title: "Foundation/Design Tokens",
  component: DesignTokens,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof DesignTokens>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllTokens: Story = {};
