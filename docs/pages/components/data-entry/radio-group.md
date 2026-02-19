# RadioGroup

RadioGroup composes RadioOption children and manages single-value selection with controlled value API.

## Examples

### Risk Mode

```tsx
import { useState } from 'react'

function RadioGroupExample() {
  const [mode, setMode] = useState('review')

  return (
    <Column gap={8}>
      <Text size="sm" tone="muted">Selected mode: {mode}</Text>
      <RadioGroup value={mode} onChange={setMode}>
        <RadioOption value="conservative" label="Conservative" />
        <RadioOption value="review" label="Review" />
        <RadioOption value="aggressive" label="Aggressive" />
      </RadioGroup>
    </Column>
  )
}

<RadioGroupExample />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | string | undefined | Selected option value (controlled). |
| onChange | (value) => void | undefined | Fired when option changes. |
| name | string | undefined | Shared radio input name. |
