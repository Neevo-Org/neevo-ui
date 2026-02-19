# Popover

Popover reveals contextual content attached to a trigger without leaving the page flow.

## Examples

### Action Popover

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
        <PopoverContent>
          <Text size="sm">Contextual actions and content.</Text>
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
| onOpenChange | (open) => void | undefined | Called when open state changes. |
| align | "start" \| "center" \| "end" | "start" | Horizontal alignment for content. |
