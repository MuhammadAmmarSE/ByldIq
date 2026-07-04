# CommandPalette

A searchable global command menu, built on `cmdk` + Radix `Dialog`, per
CLAUDE.md Part 8's Command Palette spec ("searches Pages, Projects,
Articles, Technologies, Commands, BuildPath, AI, Everything").

**Structural only in Milestone 2** — `groups` is empty by default since
there are no pages/articles/technologies yet to search. Real platforms
wire their content in via `CommandPaletteProvider`'s `groups` prop once
they exist.

## Usage

Most consumers never render `<CommandPalette>` directly — `CommandPaletteProvider`
(mounted once in `AppProviders`) owns the global `Cmd`/`Ctrl`+`K` shortcut
and lazy-loads the palette itself:

```tsx
<CommandPaletteProvider groups={myGroups}>
  <App />
</CommandPaletteProvider>
```

`groups` shape:

```tsx
[
  {
    heading: "Pages",
    items: [{ id: "home", label: "Homepage", icon: Home, onSelect: () => router.push("/") }],
  },
];
```

To open the palette from a button (e.g. `Navbar`'s search trigger)
without rendering a second controlled instance, use `useCommandPalette()`:

```tsx
const { open } = useCommandPalette();
<Button onClick={open}>Search</Button>;
```

Render `<CommandPalette>` directly only outside a `CommandPaletteProvider`
tree (rare — e.g. an isolated Storybook story). See the
`TriggeredFromButton` story for the fully-controlled pattern.

## Props

| Prop           | Type                      | Default                                     | Notes                  |
| -------------- | ------------------------- | ------------------------------------------- | ---------------------- |
| `groups`       | `CommandPaletteGroup[]`   | —                                           | Required.              |
| `open`         | `boolean`                 | —                                           | Required — controlled. |
| `onOpenChange` | `(open: boolean) => void` | —                                           | Required.              |
| `placeholder`  | `string`                  | `"Search pages, articles, technologies..."` |                        |

## Accessibility

Radix `Dialog` provides focus trapping and `Escape`-to-close; `cmdk`
provides the ARIA `combobox`/`listbox` pattern (arrow keys to navigate,
`Enter` to select, live-filtered results). Selecting an item both fires
its `onSelect` and closes the palette.
