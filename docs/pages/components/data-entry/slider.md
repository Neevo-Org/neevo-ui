# Slider / RangeSlider

Slider and RangeSlider let users select one value or a bounded interval from a numeric range.

## Examples

### Single + Range

```tsx
import { useState } from 'react'

function SliderExample() {
  const [opacity, setOpacity] = useState(42)
  const [range, setRange] = useState([40, 140])

  return (
    <Column gap={8}>
      <Text size="sm" tone="muted">Opacity: {opacity}% | Range: {range[0]}-{range[1]}</Text>
      <Slider label="Opacity" min={0} max={100} value={opacity} onChange={setOpacity} />
      <RangeSlider label="Price" min={0} max={200} value={range} onChange={setRange} />
    </Column>
  )
}

<SliderExample />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| min / max / step | number | 0 / 100 / 1 | Numeric boundaries and increment. |
| value | number \| [number, number] | undefined | Controlled current value(s). |
| defaultValue | number \| [number, number] | 0 / [20, 80] | Initial value(s) in uncontrolled mode. |
| onChange | (value, event) => void | undefined | Called when slider value changes. |
| showValue | boolean | true | Shows current value labels. |
