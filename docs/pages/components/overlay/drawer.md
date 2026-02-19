# Drawer

Drawer is a side-attached portal panel for settings and workflows that should preserve page context.

## Examples

### Right Drawer

```tsx
import { useState } from 'react'

function DrawerExample() {
  const [open, setOpen] = useState(false)

  return (
    <Column gap={8}>
      <Button variant="secondary" onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer open={open} side="right" onClose={() => setOpen(false)}>
        <DrawerHeader title="Filters" />
        <DrawerBody>
          <Text>Sector, cap size, and risk filters go here.</Text>
        </DrawerBody>
      </Drawer>
    </Column>
  )
}

<DrawerExample />
```

### Left Drawer

```tsx
import { useState } from 'react'

function LeftDrawerExample() {
  const [open, setOpen] = useState(false)

  return (
    <Column gap={8}>
      <Button variant="secondary" onClick={() => setOpen(true)}>Open left drawer</Button>
      <Drawer open={open} side="left" onClose={() => setOpen(false)}>
        <DrawerHeader title="Navigation" />
        <DrawerBody>
          <Text>Primary app navigation content.</Text>
        </DrawerBody>
      </Drawer>
    </Column>
  )
}

<LeftDrawerExample />
```
