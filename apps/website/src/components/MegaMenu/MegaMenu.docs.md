# MegaMenu

A dropdown panel for a primary nav item with sub-items, built on Radix
`Popover`. Used by `Navbar` automatically for any `NavItem` with
`children` — per CLAUDE.md Part 8, e.g. "Solutions -> Enterprise,
Startup, Commerce, AI, Cloud, Automation, Product Design."

## Usage

```tsx
<MegaMenu
  item={{
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "Startup", href: "/solutions/startup" },
      { label: "Enterprise", href: "/solutions/enterprise" },
    ],
  }}
/>
```

## Props

| Prop   | Type      | Default | Notes                                             |
| ------ | --------- | ------- | ------------------------------------------------- |
| `item` | `NavItem` | —       | Required. Must have a non-empty `children` array. |

## Accessibility

Click-to-open (not hover), so keyboard and mouse users get identical
behavior: `Enter`/`Space` opens, `Escape` closes and returns focus to the
trigger, `Tab` moves through the panel's links.
