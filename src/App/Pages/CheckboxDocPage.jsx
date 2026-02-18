import { useState } from 'react'
import {
  Checkbox,
  Column,
  Text
} from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

export function CheckboxDocPage() {
  const [checked, setChecked] = useState(true)
  return (
    <>
      <Text tone="muted">Checkbox supports labeled single selection with animated check transitions.</Text>
      <Section title="Examples">
        <Example title="Basic" code={`<Checkbox label="Risk alerts" checked={state} onChange={...} />`}>
          <Checkbox label="Risk alerts" description="Notify when stop levels are hit" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
        </Example>
        <Example title="Multiple" code={`<Checkbox label="Email" />\n<Checkbox label="Push" />`}>
          <Column>
            <Checkbox label="Email notifications" defaultChecked />
            <Checkbox label="Push notifications" />
            <Checkbox label="SMS notifications" />
          </Column>
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable
          rows={[
            { prop: 'label', type: 'string', defaultValue: 'undefined', description: 'Primary option label.' },
            { prop: 'description', type: 'string', defaultValue: 'undefined', description: 'Secondary explanatory text.' },
            { prop: 'checked / defaultChecked', type: 'boolean', defaultValue: 'false', description: 'Controlled/uncontrolled checked state.' },
          ]}
        />
      </Section>
    </>
  )
}


