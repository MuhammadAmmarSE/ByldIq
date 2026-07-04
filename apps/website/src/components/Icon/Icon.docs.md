# Icon

Thin wrapper around [Lucide](https://lucide.dev) icons for consistent
sizing, stroke width, and accessibility handling.

## Usage

```tsx
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/Icon";

<Icon icon={ArrowRight} size="sm" />;
```

Always import the icon component directly from `lucide-react` at the call
site — never build a string-keyed icon registry, it defeats tree-shaking.

## Props

| Prop        | Type                                   | Default | Notes                                                                          |
| ----------- | -------------------------------------- | ------- | ------------------------------------------------------------------------------ |
| `icon`      | `LucideIcon`                           | —       | Required.                                                                      |
| `size`      | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"`  | Maps to 14/16/20/24/32px.                                                      |
| `label`     | `string`                               | —       | Set only when the icon is the sole meaningful content (e.g. icon-only button). |
| `className` | `string`                               | —       | Merged via `cn()`.                                                             |

## Accessibility

- Decorative by default: `aria-hidden="true"`, no role.
- Pass `label` to make it a meaningful image (`role="img"` +
  `aria-label`) — but prefer labelling the _button/link_ it sits inside
  instead when possible; only use `label` on the icon itself when there is
  no surrounding accessible name.
