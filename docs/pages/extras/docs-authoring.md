# Docs Authoring

Use one MDX file per component or guide inside `docs/pages`.

## Required Meta

Each page should export:

```tsx
export const meta = {
  id: 'unique-id',
  label: 'Sidebar Label',
  description: 'Short summary for the page',
  order: 10,
}
```

## Directory Pages

When a directory should be an openable page, create `docs/pages/<path>/_self.mdx`.
Additional `.mdx` files inside that directory become subpages.

## Recommended Sections

1. Overview
2. Examples
3. Props
4. Accessibility notes
5. Do and Don't
