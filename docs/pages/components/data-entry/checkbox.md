# Checkbox

Checkbox supports labeled single selection with animated check transitions.

## Examples

### Basic

```tsx
import { useState } from 'react'

function CheckboxExample() {
  const [checked, setChecked] = useState(true)

  return (
    <Column gap={8}>
      <Text size="sm" tone="muted">Risk alerts are {checked ? 'enabled' : 'disabled'}.</Text>
      <Checkbox label="Risk alerts" checked={checked} onChange={(event) => setChecked(event.target.checked)} />
    </Column>
  )
}

<CheckboxExample />
```

### Multiple

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: Multiple.</Text>
  <Column gap={8}>
    <Checkbox label="Email" />
    <Checkbox label="Push" />
  </Column>
</Column>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| label | string | undefined | Primary option label. |
| description | string | undefined | Secondary explanatory text. |
| checked / defaultChecked | boolean | false | Controlled/uncontrolled checked state. |
