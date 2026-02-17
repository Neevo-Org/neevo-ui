import {
  Button,
  I,
  Row,
  Text
} from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

export function ButtonDocPage() {
  return (
    <>
      <Text tone="muted">Buttons support clear variant semantics and can be composed with icons and custom sizing classes.</Text>
      <Section title="Examples">
        <Example
          title="Variants"
          code={`<Button>Primary</Button>\n<Button variant="secondary">Secondary</Button>`}
        >
          <Row>
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
          </Row>
        </Example>
        <Example
          title="With Icon"
          code={`<Button variant="secondary"><I>arrow</I> Continue</Button>`}
        >
          <Button variant="secondary"><I>arrow</I> Continue</Button>
        </Example>
        <Example
          title="Disabled"
          code={`<Button disabled>Disabled</Button>`}
        >
          <Button disabled>Disabled</Button>
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable
          rows={[
            { prop: 'variant', type: '"primary" | "secondary"', defaultValue: '"primary"', description: 'Visual style variant.' },
            { prop: 'type', type: '"button" | "submit" | "reset"', defaultValue: '"button"', description: 'Native button type.' },
            { prop: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disables interaction.' },
            { prop: 'className', type: 'string', defaultValue: '""', description: 'Custom class composition.' },
          ]}
        />
      </Section>
    </>
  )
}


