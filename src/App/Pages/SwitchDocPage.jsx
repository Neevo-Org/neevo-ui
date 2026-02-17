import { useState } from 'react'
import {
  Switch,
  Text
} from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

export function SwitchDocPage() {
  const [sync, setSync] = useState(false)
  return (
    <>
      <Text tone="muted">Switch is a binary control with animated thumb icon morph and compact expressive track style.</Text>
      <Section title="Examples">
        <Example title="Interactive" code={`<Switch label="Auto-sync" checked={sync} onChange={...} />`}>
          <Switch label="Auto-sync watchlist" description="Sync every 30 seconds" checked={sync} onChange={(e) => setSync(e.target.checked)} />
        </Example>
        <Example title="Disabled" code={`<Switch disabled checked />`}>
          <Switch label="Locked setting" checked disabled />
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable
          rows={[
            { prop: 'label / description', type: 'string', defaultValue: 'undefined', description: 'Text shown next to the control.' },
            { prop: 'checked / defaultChecked', type: 'boolean', defaultValue: 'false', description: 'Controlled/uncontrolled state.' },
            { prop: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disables interaction.' },
          ]}
        />
      </Section>
    </>
  )
}


