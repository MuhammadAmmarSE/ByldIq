# SectionHeader

The eyebrow + heading + supporting-copy pattern used across roughly
eighteen landing pages and in-page sections, extracted into one
component rather than hand-rolled JSX in every feature.

## Two shapes

- **Page title**: `headingVariant="display"` — the page's real `<h1>`.
- **In-page section header** (default): `headingVariant="h2"` — a
  section within a page that already has its own `<h1>` elsewhere.

Use `headingAs` when the visual size and the correct document heading
level diverge (the same escape hatch `Heading` itself provides).

## Usage

```tsx
<SectionHeader
  eyebrow="Startup Journey"
  heading="Build products investors believe in."
  description="Transform your idea into a scalable digital product."
  actions={<Button>Start BuildPath</Button>}
/>
```

## Props

| Prop             | Type                 | Default  | Notes                                                                                         |
| ---------------- | -------------------- | -------- | --------------------------------------------------------------------------------------------- |
| `eyebrow`        | `string`             | —        | Rendered as an outline `Badge`.                                                               |
| `heading`        | `ReactNode`          | required |                                                                                               |
| `headingVariant` | `HeadingVariant`     | `"h2"`   | Pass `"display"` for a page's real `<h1>`.                                                    |
| `headingAs`      | `ElementType`        | —        | Semantic override, independent of `headingVariant`.                                           |
| `description`    | `ReactNode`          | —        |                                                                                               |
| `actions`        | `ReactNode`          | —        | A CTA/link, laid out beside the heading on `lg+`.                                             |
| `align`          | `"left" \| "center"` | `"left"` | `center` is ignored when `actions` is set — a centered header with a side action reads oddly. |

## Not a retrofit

Existing pages (Solutions, Case Studies, Technology, Knowledge) already
hand-compose this same shape and work correctly — they aren't rewritten
onto this component. `SectionHeader` exists for pages built from here
forward.
