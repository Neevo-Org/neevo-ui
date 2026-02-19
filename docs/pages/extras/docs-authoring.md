# Docs Authoring

Use one markdown file per component or guide inside `docs/pages`.

## File Format

- Use `.md` files.
- Do not export `meta`; navigation is inferred from folder/file structure and heading content.

## Page Title

Start each page with a single H1 heading:

```md
# Button
```

The first non-empty paragraph is used as page description in navigation contexts.

## Directory Pages

When a directory should be an openable page, create `docs/pages/<path>/_self.md`.
Additional `.md` files inside that directory become subpages.

## Code Fences and Live Preview

- Only `tsx` code fences render live previews in docs.
- All other fences (`jsx`, `ts`, `js`, `bash`, etc.) render as static code blocks.
- Keep `tsx` examples self-contained and runnable in docs context.

Example:

```tsx
import { useState } from 'react'

function Example() {
  const [open, setOpen] = useState(false)
  return <Switch checked={open} onChange={(e) => setOpen(e.target.checked)} />
}

<Example />
```

## Recommended Sections

1. Overview
2. Examples
3. Props
4. Accessibility notes
5. Do and Don't
