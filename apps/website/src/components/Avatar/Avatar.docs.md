# Avatar

Represents a person or entity. Built on Radix `Avatar` so a broken or
loading image never leaves a blank circle — it always falls back to
initials.

## Usage

```tsx
<Avatar src="/team/jane.jpg" alt="Jane Cooper" fallback="JC" />
<Avatar alt="Byld IQ" fallback="BI" size="lg" />
```

## Props

| Prop       | Type                           | Default | Notes                                                |
| ---------- | ------------------------------ | ------- | ---------------------------------------------------- |
| `src`      | `string`                       | —       | Omit to always show the fallback.                    |
| `alt`      | `string`                       | —       | Required — describes who/what the avatar represents. |
| `fallback` | `string`                       | —       | Typically initials, shown while loading or on error. |
| `size`     | `"sm" \| "md" \| "lg" \| "xl"` | `"md"`  |                                                      |

## Accessibility / motion

The fallback renders immediately when there's no `src`, and after a short
delay (avoiding a flash) when an image is loading — Radix handles the
loading-state timing internally. No motion.
