import { Accordion, AccordionItem, Text } from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

export function AccordionDocPage() {
  return (
    <>
      <Text tone="muted">Accordion helps organize stacked expandable sections with single or multiple open behavior.</Text>
      <Section title="Examples">
        <Example
          title="Single Open"
          code={`<Accordion>\n  <AccordionItem value="risk" title="Risk settings">...</AccordionItem>\n  <AccordionItem value="alerts" title="Alerts">...</AccordionItem>\n</Accordion>`}
        >
          <Accordion>
            <AccordionItem value="risk" title="Risk settings">
              <Text size="sm" tone="muted">Control position sizing, stop distance, and exposure limits.</Text>
            </AccordionItem>
            <AccordionItem value="alerts" title="Alerts">
              <Text size="sm" tone="muted">Configure email, push, and webhook notifications.</Text>
            </AccordionItem>
          </Accordion>
        </Example>
        <Example
          title="Multiple Open"
          code={`<Accordion multiple defaultValue={['a', 'b']}>...</Accordion>`}
        >
          <Accordion multiple defaultValue={['a', 'b']}>
            <AccordionItem value="a" title="Section A">
              <Text size="sm" tone="muted">First section content.</Text>
            </AccordionItem>
            <AccordionItem value="b" title="Section B">
              <Text size="sm" tone="muted">Second section content.</Text>
            </AccordionItem>
          </Accordion>
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable rows={[
          { prop: 'multiple', type: 'boolean', defaultValue: 'false', description: 'Allows more than one open item.' },
          { prop: 'value / defaultValue', type: 'string | string[]', defaultValue: 'undefined', description: 'Controlled/uncontrolled open values.' },
          { prop: 'onValueChange', type: '(value) => void', defaultValue: 'undefined', description: 'Open state callback.' },
          { prop: 'AccordionItem.title', type: 'string', defaultValue: 'required', description: 'Trigger label.' },
        ]} />
      </Section>
    </>
  )
}
