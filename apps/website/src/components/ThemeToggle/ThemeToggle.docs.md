# ThemeToggle

A quick light/dark switch (not the full light/dark/system choice) for
the navbar and mobile menu, built on `next-themes`' `useTheme()`.

## Usage

```tsx
<ThemeToggle />
```

## Accessibility

The accessible label always states the action, not the current state
("Switch to dark theme," not "Dark mode"). Disabled with a neutral
"Toggle theme" label until mounted on the client — `resolvedTheme` is
`undefined` on the server, and rendering a theme-dependent icon/label
before mount would cause a hydration mismatch.

## Storybook note

Storybook's dark/light toggle is driven by the `addon-themes` toolbar,
not `next-themes` (see `StorybookProviders`) — clicking this component
in Storybook won't visibly change the preview's theme.
