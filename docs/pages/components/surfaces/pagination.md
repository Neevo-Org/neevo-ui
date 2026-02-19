# Pagination

Pagination helps users navigate long result sets one page at a time.

## Examples

### Paginated Navigation

```tsx
import { useState } from 'react'

function PaginationExample() {
  const [page, setPage] = useState(3)

  return (
    <Column gap={8}>
      <Text size="sm" tone="muted">Page {page} of 12</Text>
      <Pagination page={page} totalPages={12} onPageChange={setPage} />
    </Column>
  )
}

<PaginationExample />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| page | number | 1 | Current page. |
| totalPages | number | 1 | Total number of pages. |
| onPageChange | (page) => void | undefined | Called when page changes. |
| siblingCount | number | 1 | Visible page buttons around current page. |
