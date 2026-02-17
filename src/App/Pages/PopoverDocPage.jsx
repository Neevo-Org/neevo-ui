import { Button, Popover, PopoverContent, PopoverTrigger, Text } from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

export function PopoverDocPage() {
  return (
    <>
      <Text tone="muted">Popover reveals contextual content attached to a trigger without leaving the page flow.</Text>
      <Section title="Examples">
        <Example
          title="Action Popover"
          code={`<Popover>\n  <PopoverTrigger>\n    <Button variant="secondary">Open popover</Button>\n  </PopoverTrigger>\n  <PopoverContent>\n    <Text size="sm">Contextual actions and content.</Text>\n  </PopoverContent>\n</Popover>`}
        >
          <Popover>
            <PopoverTrigger>
              <Button variant="secondary">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <Text size="sm">Contextual actions and content.</Text>
            </PopoverContent>
          </Popover>
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable rows={[
          { prop: 'open / defaultOpen', type: 'boolean', defaultValue: 'false', description: 'Controlled or uncontrolled open state.' },
          { prop: 'onOpenChange', type: '(open) => void', defaultValue: 'undefined', description: 'Called when open state changes.' },
          { prop: 'align', type: '"start" | "center" | "end"', defaultValue: '"start"', description: 'Horizontal alignment for content.' },
        ]} />
      </Section>
    </>
  )
}
