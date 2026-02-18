import { useState } from 'react'
import {
  Input,
  RadioGroup,
  RadioOption,
  Text
} from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

export function RadioGroupDocPage() {
  const [mode, setMode] = useState('balanced')
  return (
    <>
      <Text tone="muted">RadioGroup composes RadioOption children and manages single-value selection with controlled value API.</Text>
      <Section title="Examples">
        <Example
          title="Risk Mode"
          code={`<RadioGroup value={mode} onChange={setMode}>\n  <RadioOption value="conservative" label="Conservative" />\n</RadioGroup>`}
        >
          <RadioGroup label="Risk mode" description="Controls position sizing presets" value={mode} onChange={setMode} name="risk-mode-docs">
            <RadioOption value="conservative" label="Conservative" description="Lower exposure" />
            <RadioOption value="balanced" label="Balanced" description="Default profile" />
            <RadioOption value="aggressive" label="Aggressive" description="Higher exposure" />
          </RadioGroup>
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable
          rows={[
            { prop: 'value', type: 'string', defaultValue: 'undefined', description: 'Selected option value (controlled).' },
            { prop: 'onChange', type: '(value) => void', defaultValue: 'undefined', description: 'Fired when option changes.' },
            { prop: 'name', type: 'string', defaultValue: 'undefined', description: 'Shared radio input name.' },
          ]}
        />
      </Section>
    </>
  )
}


