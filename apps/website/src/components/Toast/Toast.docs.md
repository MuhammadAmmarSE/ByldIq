# Toast

A transient, self-dismissing notification, built on Radix `Toast`. For a
persistent, inline message, use `Alert` instead.

`ToastProvider` is mounted once at the app root (already wired into
`AppProviders`/`StorybookProviders`) — there's no `<Toast>` component to
render directly. Trigger toasts from anywhere via the `useToast()` hook.

## Usage

```tsx
const { toast } = useToast();

toast({
  title: "Roadmap ready",
  description: "Let's review the next steps together.",
  variant: "success",
});
```

## `ToastOptions`

| Prop          | Type                                              | Default     | Notes                             |
| ------------- | ------------------------------------------------- | ----------- | --------------------------------- |
| `title`       | `ReactNode`                                       | —           | Required.                         |
| `description` | `ReactNode`                                       | —           | Optional supporting detail.       |
| `variant`     | `"default" \| "success" \| "warning" \| "danger"` | `"default"` | Determines icon and color.        |
| `duration`    | `number`                                          | `5000`      | Milliseconds before auto-dismiss. |

## Accessibility

Radix `Toast` announces new toasts to assistive tech via a live region,
supports swipe-to-dismiss, and pauses the auto-dismiss timer while the
toast has focus or is hovered. Every toast also renders an explicit close
button — never rely on the timeout alone.
