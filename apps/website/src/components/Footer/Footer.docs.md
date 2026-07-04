# Footer

The site footer — per CLAUDE.md Part 8, "Footer is not legal links.
Footer is a navigation hub." Structural only: `columns` and
`socialLinks` are empty by default until the real IA and social
presence exist.

## Usage

```tsx
<Footer
  columns={[{ heading: "Solutions", items: [{ label: "Startup", href: "/solutions/startup" }] }]}
  socialLinks={[{ label: "Website", href: "https://byldiq.com", icon: Globe }]}
/>
```

## Props

| Prop          | Type                                  | Default | Notes                                                |
| ------------- | ------------------------------------- | ------- | ---------------------------------------------------- |
| `columns`     | `{ heading, items: NavItem[] }[]`     | `[]`    |                                                      |
| `socialLinks` | `{ label, href, icon: LucideIcon }[]` | `[]`    | See note below on brand icons.                       |
| `newsletter`  | `ReactNode`                           | —       | Optional slot; content/behavior is a later decision. |

**Brand icons**: `lucide-react` doesn't ship platform logos (GitHub,
LinkedIn, X, ...) — they were removed upstream over trademark concerns.
`socialLinks[].icon` is typed as `LucideIcon` for consistency with the
rest of this system, so real brand marks will need a separate icon
source wired in when social links are actually populated.

## Accessibility

Every social link has an explicit `aria-label` (the icon alone isn't a
name) and opens in a new tab with `rel="noreferrer"`.
