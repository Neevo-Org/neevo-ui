import { useState } from 'react'
import { TagInput, Text } from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

export function TagInputDocPage() {
  const [tags, setTags] = useState(['react', 'ui'])

  return (
    <>
      <Text tone="muted">TagInput helps users create and remove chip-like tags using keyboard separators.</Text>
      <Section title="Examples">
        <Example
          title="Editable Tags"
          code={`<TagInput value={tags} onChange={setTags} placeholder="Add technology..." />`}
        >
          <TagInput value={tags} onChange={setTags} placeholder="Add technology..." />
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable rows={[
          { prop: 'value', type: 'string[]', defaultValue: 'undefined', description: 'Controlled tag list.' },
          { prop: 'defaultValue', type: 'string[]', defaultValue: '[]', description: 'Initial tags for uncontrolled mode.' },
          { prop: 'onChange', type: '(tags) => void', defaultValue: 'undefined', description: 'Called when tags change.' },
          { prop: 'separators', type: 'string[]', defaultValue: '[",", "Enter"]', description: 'Keys that add a new tag.' },
        ]} />
      </Section>
    </>
  )
}
