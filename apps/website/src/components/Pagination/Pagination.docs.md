# Pagination

Page navigation for long result sets (case studies, knowledge center
articles). Shows the first and last page plus a window around the
current page, collapsing the rest into an ellipsis.

## Usage

```tsx
const [page, setPage] = useState(1);

<Pagination page={page} pageCount={24} onPageChange={setPage} />;
```

## Props

| Prop           | Type                     | Default | Notes                |
| -------------- | ------------------------ | ------- | -------------------- |
| `page`         | `number`                 | —       | Required. 1-indexed. |
| `pageCount`    | `number`                 | —       | Required.            |
| `onPageChange` | `(page: number) => void` | —       | Required.            |

## Accessibility

Wrapped in `<nav aria-label="Pagination">`. Each page button has an
explicit `aria-label` ("Page 3") since the visible content is just a
number; the current page carries `aria-current="page"`. Previous/Next
buttons disable themselves at the boundaries rather than wrapping
around.
