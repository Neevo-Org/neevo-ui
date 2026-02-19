# Modal

Modal is a centered portal overlay with escape handling, overlay close, scroll lock, and composable sections.

## Examples

### Action Modal

```tsx
import { useState } from 'react'

function ModalExample() {
  const [open, setOpen] = useState(false)

  return (
    <Column gap={8}>
      <Button variant="secondary" onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalHeader title="Delete Position" description="This action cannot be undone." />
        <ModalBody>
          <Text>Are you sure you want to remove this position from the watchlist?</Text>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Delete</Button>
        </ModalFooter>
      </Modal>
    </Column>
  )
}

<ModalExample />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| open | boolean | false | Visibility state. |
| onClose | () => void | undefined | Close callback. |
| closeOnEscape | boolean | true | ESC key behavior. |
| closeOnOverlayClick | boolean | true | Overlay click behavior. |
