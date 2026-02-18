import { Button, I, Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger, Text } from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

export function MenuDocPage() {
  return (
    <>
      <Text tone="muted">Menu and DropdownMenu provide compact action lists anchored to a trigger button.</Text>
      <Section title="Examples">
        <Example
          title="Dropdown Actions"
          code={`<Menu>\n  <MenuTrigger><Button variant="secondary">Actions</Button></MenuTrigger>\n  <MenuContent>\n    <MenuItem><I>edit</I> Edit</MenuItem>\n    <MenuItem><I>share</I> Share</MenuItem>\n    <MenuSeparator />\n    <MenuItem><I>delete</I> Delete</MenuItem>\n  </MenuContent>\n</Menu>`}
        >
          <Menu>
            <MenuTrigger>
              <Button variant="secondary">Actions</Button>
            </MenuTrigger>
            <MenuContent>
              <MenuItem><I>edit</I> Edit</MenuItem>
              <MenuItem><I>share</I> Share</MenuItem>
              <MenuSeparator />
              <MenuItem><I>delete</I> Delete</MenuItem>
            </MenuContent>
          </Menu>
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable rows={[
          { prop: 'open / defaultOpen', type: 'boolean', defaultValue: 'false', description: 'Controlled or uncontrolled menu state.' },
          { prop: 'onOpenChange', type: '(open) => void', defaultValue: 'undefined', description: 'Called when menu opens or closes.' },
          { prop: 'align', type: '"start" | "center" | "end"', defaultValue: '"start"', description: 'Horizontal alignment for content.' },
          { prop: 'onSelect', type: '(event) => void', defaultValue: 'undefined', description: 'Item click callback before close.' },
        ]} />
      </Section>
    </>
  )
}

