import { useState } from 'react'
import {
  Calendar,
  Column,
  Grid,
  Text
} from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

export function CalendarDocPage() {
  const [date, setDate] = useState(new Date())
  return (
    <>
      <Text tone="muted">Calendar supports month navigation, year picker mode, selectable date state, and themed day styles.</Text>
      <Section title="Examples">
        <Example title="Controlled Date" code={`<Calendar value={date} onChange={setDate} />`}>
          <Column>
            <Calendar value={date} onChange={setDate} />
            <Text size="sm" tone="muted">Selected: {date.toLocaleDateString()}</Text>
          </Column>
        </Example>
      </Section>
      <Section title="Behavior Notes">
        <ul className="docs-list">
          <li>Header arrows navigate month view.</li>
          <li>Clicking month label toggles year grid.</li>
          <li>In year mode arrows paginate year ranges.</li>
          <li>Supports controlled and uncontrolled value usage.</li>
        </ul>
      </Section>
    </>
  )
}


