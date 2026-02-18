import { useState } from 'react'
import {
  Input,
  Row,
  Text
} from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

export function InputDocPage() {
  const [email, setEmail] = useState('')
  const [qty, setQty] = useState('5')
  const [risk, setRisk] = useState('1.25')

  return (
    <>
      <Text tone="muted">Input supports restrictive numeric modes while keeping native browser constraints and full controlled behavior.</Text>
      <Section title="Examples">
        <Example
          title="Text Input with Icons"
          code={`<Input label="Email" leadingIcon="mail" trailingIcon="alternate_email" />`}
        >
          <Input label="Email" placeholder="trader@desk.com" leadingIcon="mail" trailingIcon="alternate_email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Example>
        <Example
          title="Integer Restriction"
          code={`<Input mode="integer" min={1} max={100} maxLength={3} />`}
        >
          <Input label="Quantity" mode="integer" min={1} max={100} maxLength={3} value={qty} onChange={(e) => setQty(e.target.value)} hint="Clamped on blur" />
        </Example>
        <Example
          title="Float Restriction"
          code={`<Input mode="float" min={0} max={5} />`}
        >
          <Input label="Risk %" mode="float" min={0} max={5} value={risk} onChange={(e) => setRisk(e.target.value)} hint="Supports decimal and negative guard" />
        </Example>
        <Example
          title="Disabled and Error"
          code={`<Input disabled value="Locked" />\n<Input error="Invalid value" />`}
        >
          <Row align="flex-start">
            <Input label="Disabled" disabled value="Locked field" />
            <Input label="Error" value="abc" error="Only numbers are allowed" />
          </Row>
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable
          rows={[
            { prop: 'mode', type: '"text" | "integer" | "float"', defaultValue: '"text"', description: 'Sanitization strategy during input.' },
            { prop: 'min / max', type: 'number', defaultValue: 'undefined', description: 'Clamp limits for numeric modes on blur.' },
            { prop: 'maxLength', type: 'number', defaultValue: 'undefined', description: 'Maximum character length (enforced).' },
            { prop: 'disabled / dissabled', type: 'boolean', defaultValue: 'false', description: 'Disables field interaction.' },
            { prop: 'leadingIcon / trailingIcon', type: 'string', defaultValue: 'undefined', description: 'Material icon names shown in input shell.' },
            { prop: 'label / hint / error', type: 'string', defaultValue: 'undefined', description: 'Field metadata text.' },
          ]}
        />
      </Section>
    </>
  )
}


