# CommandPalette

CommandPalette offers fast keyboard-first navigation and actions from a central search dialog.

## Examples

### Search Commands

```tsx
import { useState } from 'react'

function CommandPaletteExample() {
  const [open, setOpen] = useState(false)
  const [lastAction, setLastAction] = useState('No action yet')

  return (
    <Column gap={8}>
      <Text size="sm" tone="muted">Last action: {lastAction}</Text>
      <Button onClick={() => setOpen(true)}>Open Command Palette</Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        onSelect={(item) => setLastAction(item.label)}
        items={[
          { id: 'new-file', label: 'New file', group: 'General', shortcut: 'N F' },
          { id: 'open-settings', label: 'Open settings', group: 'General', shortcut: 'G S' },
        ]}
      />
    </Column>
  )
}

<CommandPaletteExample />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| items | Array<{ id?, label, description?, keywords?, shortcut? }> | [] | Commands shown in the list. |
| open / defaultOpen | boolean | false | Controlled or uncontrolled dialog state. |
| onOpenChange | (open) => void | undefined | Called when palette opens/closes. |
| onSelect | (item) => void | undefined | Called after selecting a command. |
