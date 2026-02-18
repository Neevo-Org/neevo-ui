import { useState } from 'react'
import {
  Input,
  Text,
  TextArea
} from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

export function TextAreaDocPage() {
  const [note, setNote] = useState('')
  return (
    <>
      <Text tone="muted">TextArea mirrors Input styling with larger editable region and vertical resize support.</Text>
      <Section title="Examples">
        <Example
          title="Basic Notes"
          code={`<TextArea label="Trade note" rows={5} />`}
        >
          <TextArea label="Trade note" rows={5} placeholder="Describe setup, trigger, invalidation, target..." value={note} onChange={(e) => setNote(e.target.value)} hint="Markdown-style plain text works well." />
        </Example>
        <Example
          title="Error State"
          code={`<TextArea error="Please add at least 30 characters" />`}
        >
          <TextArea label="Review" value="Too short" error="Please add at least 30 characters" />
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable
          rows={[
            { prop: 'rows', type: 'number', defaultValue: '4', description: 'Initial visible text rows.' },
            { prop: 'label / hint / error', type: 'string', defaultValue: 'undefined', description: 'Field metadata text.' },
            { prop: 'className', type: 'string', defaultValue: '""', description: 'Wrapper class override.' },
          ]}
        />
      </Section>
    </>
  )
}


