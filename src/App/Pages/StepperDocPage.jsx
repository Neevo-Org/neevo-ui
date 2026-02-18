import { Stepper, Text } from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

const STEPS = [
  { label: 'Details' },
  { label: 'Address' },
  { label: 'Review' },
  { label: 'Complete' },
]

export function StepperDocPage() {
  return (
    <>
      <Text tone="muted">Stepper visualizes multi-step flows and highlights the current step in sequence.</Text>
      <Section title="Examples">
        <Example
          title="Checkout Progress"
          code={`<Stepper steps={steps} current={2} />`}
        >
          <Stepper steps={STEPS} current={2} />
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable rows={[
          { prop: 'steps', type: 'Array<{ label, key? }>', defaultValue: '[]', description: 'Step items in display order.' },
          { prop: 'current', type: 'number', defaultValue: '0', description: 'Zero-based index of active step.' },
        ]} />
      </Section>
    </>
  )
}
