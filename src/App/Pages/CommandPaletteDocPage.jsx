import { useState } from 'react'
import { Button, Column, CommandPalette, Text } from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

const COMMANDS = [
  { id: 'new-doc', label: 'New document', description: 'Create a blank document', shortcut: 'N' },
  { id: 'search', label: 'Search components', description: 'Jump to component docs', shortcut: 'F' },
  { id: 'theme', label: 'Toggle theme', description: 'Switch light and dark mode', shortcut: 'T' },
]

export function CommandPaletteDocPage() {
  const [open, setOpen] = useState(false)
  const [lastAction, setLastAction] = useState('No command selected yet.')

  return (
    <>
      <Text tone="muted">CommandPalette offers fast keyboard-first navigation and actions from a central search dialog.</Text>
      <Section title="Examples">
        <Example
          title="Search Commands"
          code={`<Button onClick={() => setOpen(true)}>Open Command Palette</Button>\n<CommandPalette open={open} onOpenChange={setOpen} items={commands} onSelect={setLastAction} />`}
        >
          <Column>
            <Button onClick={() => setOpen(true)}>Open Command Palette</Button>
            <Text size="sm" tone="muted">{lastAction}</Text>
            <CommandPalette
              open={open}
              onOpenChange={setOpen}
              items={COMMANDS}
              onSelect={(item) => setLastAction(`Selected: ${item.label}`)}
            />
          </Column>
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable rows={[
          { prop: 'items', type: 'Array<{ id?, label, description?, keywords?, shortcut? }>', defaultValue: '[]', description: 'Commands shown in the list.' },
          { prop: 'open / defaultOpen', type: 'boolean', defaultValue: 'false', description: 'Controlled or uncontrolled dialog state.' },
          { prop: 'onOpenChange', type: '(open) => void', defaultValue: 'undefined', description: 'Called when palette opens/closes.' },
          { prop: 'onSelect', type: '(item) => void', defaultValue: 'undefined', description: 'Called after selecting a command.' },
        ]} />
      </Section>
    </>
  )
}

