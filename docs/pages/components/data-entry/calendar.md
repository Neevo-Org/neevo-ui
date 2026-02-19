# Calendar

Calendar supports month navigation, year picker mode, selectable date state, and themed day styles.

## Examples

### Controlled Date

```tsx
import { useState } from 'react'

function CalendarExample() {
  const [date, setDate] = useState(new Date())

  return (
    <Column gap={8}>
      <Text size="sm" tone="muted">Selected: {date.toLocaleDateString()}</Text>
      <Calendar value={date} onChange={setDate} />
    </Column>
  )
}

<CalendarExample />
```

## Behavior Notes

Content migration in progress.
