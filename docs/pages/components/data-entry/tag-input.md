# TagInput

TagInput helps users create and remove chip-like tags using keyboard separators.

## Examples

### Editable Tags

```tsx
import { useState } from 'react'

function TagInputExample() {
  const [tags, setTags] = useState(['React', 'TypeScript'])

  return (
    <Column gap={8}>
      <Text size="sm" tone="muted">Tags: {tags.join(', ')}</Text>
      <TagInput value={tags} onChange={setTags} placeholder="Add technology..." />
    </Column>
  )
}

<TagInputExample />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | string[] | undefined | Controlled tag list. |
| defaultValue | string[] | [] | Initial tags for uncontrolled mode. |
| onChange | (tags) => void | undefined | Called when tags change. |
| separators | string[] | [",", "Enter"] | Keys that add a new tag. |
