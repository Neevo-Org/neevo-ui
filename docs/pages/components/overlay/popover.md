# Popover

Popover reveals contextual content attached to a trigger without forcing a route change or a full overlay. Use it for lightweight forms, summaries, and helper panels.

## Examples

### Context Popover

```tsx
import { useState } from 'react'

function PopoverExample() {
  const [open, setOpen] = useState(false)

  return (
    <Column gap={8}>
      <Text size="sm" tone="muted">Popover is {open ? 'open' : 'closed'}.</Text>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Button variant="secondary">Open popover</Button>
        </PopoverTrigger>

        <PopoverContent size="lg" surface="tint">
          <Column gap={10}>
            <Column gap={4}>
              <Text weight="semibold">Quick note</Text>
              <Text size="sm" tone="muted">
                Capture lightweight context without opening a modal.
              </Text>
            </Column>

            <Input placeholder="Write a short note" />

            <Row justify="end" gap={8}>
              <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Save</Button>
            </Row>
          </Column>
        </PopoverContent>
      </Popover>
    </Column>
  )
}

<PopoverExample />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| open / defaultOpen | boolean | false | Controlled or uncontrolled open state. |
| onOpenChange | `(open) => void` | undefined | Called when open state changes. |
| align | `'auto' \| 'start' \| 'center' \| 'end'` | `'auto'` | Horizontal alignment for the floating content. `auto` opens left-to-right by default and flips when space runs out. |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Width preset for the popover shell. |
| surface | `'default' \| 'soft' \| 'tint'` | `'default'` | Background treatment for the popover shell. |
| offset | number | 8 | Space between the trigger and content. |
