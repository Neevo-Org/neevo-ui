# Switch

Switch is a binary control with animated thumb icon morph and compact expressive track style.

## Examples

### Interactive

```tsx
import { useState } from 'react'

function SwitchExample() {
  const [enabled, setEnabled] = useState(true)

  return (
    <Column gap={8}>
      <Text size="sm" tone="muted">Auto-sync is {enabled ? 'enabled' : 'disabled'}.</Text>
      <Switch label="Auto-sync" checked={enabled} onChange={(event) => setEnabled(event.target.checked)} />
    </Column>
  )
}

<SwitchExample />
```

### Disabled

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: Disabled.</Text>
  <Column gap={8}>
    <Switch disabled checked />
  </Column>
</Column>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| label / description | string | undefined | Text shown next to the control. |
| checked / defaultChecked | boolean | false | Controlled/uncontrolled state. |
| disabled | boolean | false | Disables interaction. |
