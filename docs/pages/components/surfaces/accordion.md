# Accordion

Accordion helps organize stacked expandable sections with single or multiple open behavior.

## Examples

### Single Open

```tsx
import { useState } from 'react'

function AccordionExample() {
  const [openItem, setOpenItem] = useState('risk')

  return (
    <Column gap={8}>
      <Text size="sm" tone="muted">Open section: {openItem}</Text>
      <Accordion value={openItem} onValueChange={setOpenItem}>
        <AccordionItem value="risk" title="Risk settings">Max drawdown and position size limits.</AccordionItem>
        <AccordionItem value="alerts" title="Alerts">Choose email, push, and webhook alerts.</AccordionItem>
      </Accordion>
    </Column>
  )
}

<AccordionExample />
```

### Multiple Open

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: Multiple Open.</Text>
  <Column gap={8}>
    <Accordion multiple defaultValue={['risk', 'alerts']}>
      <AccordionItem value="risk" title="Risk settings">Risk controls.</AccordionItem>
      <AccordionItem value="alerts" title="Alerts">Alert controls.</AccordionItem>
    </Accordion>
  </Column>
</Column>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| multiple | boolean | false | Allows more than one open item. |
| value / defaultValue | string \| string[] | undefined | Controlled/uncontrolled open values. |
| onValueChange | (value) => void | undefined | Open state callback. |
| AccordionItem.title | string | required | Trigger label. |
