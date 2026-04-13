# Calendar

Calendar supports month navigation, year picker mode, themed surfaces, size presets, and both single-date and range selection.

## Examples

### Controlled Date

```tsx
import { useState } from 'react'

function CalendarExample() {
  const [date, setDate] = useState(new Date())

  return (
    <Column gap={8}>
      <Text size="sm" tone="muted">Selected: {date.toLocaleDateString()}</Text>
      <Calendar value={date} onChange={setDate} surface="soft" />
    </Column>
  )
}

<CalendarExample />
```

### Range Selection

```tsx
import { useState } from 'react'

function CalendarRangeExample() {
  const [range, setRange] = useState({ start: new Date(), end: null })

  return (
    <Column gap={8}>
      <Text size="sm" tone="muted">
        Range: {range.start ? range.start.toLocaleDateString() : 'Start'} - {range.end ? range.end.toLocaleDateString() : 'End'}
      </Text>
      <Calendar
        value={range}
        onChange={setRange}
        selectionMode="range"
        surface="tint"
        size="lg"
      />
    </Column>
  )
}

<CalendarRangeExample />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value / defaultValue | `Date` or `{ start, end }` | undefined | Controlled or uncontrolled selected value. |
| onChange | `(value) => void` | undefined | Called when the selection changes. |
| selectionMode | `'single' \| 'range'` | `'single'` | Controls whether the calendar selects one date or a range. |
| surface | `'default' \| 'soft' \| 'tint'` | `'default'` | Background treatment for the calendar shell. |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Calendar density preset. |
