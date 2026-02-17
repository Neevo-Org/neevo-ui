import { Text, Timeline, TimelineItem } from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

export function TimelineDocPage() {
  return (
    <>
      <Text tone="muted">Timeline displays chronological updates, events, and milestones in a vertical flow.</Text>
      <Section title="Examples">
        <Example
          title="Release Timeline"
          code={`<Timeline>\n  <TimelineItem time="09:00" title="Draft ready" description="Initial API draft prepared." />\n  <TimelineItem time="12:30" title="Review" description="Team reviewed the component contracts." />\n  <TimelineItem time="16:10" title="Shipped" description="Release candidate published." />\n</Timeline>`}
        >
          <Timeline>
            <TimelineItem time="09:00" title="Draft ready" description="Initial API draft prepared." />
            <TimelineItem time="12:30" title="Review" description="Team reviewed the component contracts." />
            <TimelineItem time="16:10" title="Shipped" description="Release candidate published." />
          </Timeline>
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable rows={[
          { prop: 'title', type: 'string', defaultValue: 'undefined', description: 'Primary event title.' },
          { prop: 'description', type: 'string', defaultValue: 'undefined', description: 'Supporting event text.' },
          { prop: 'time', type: 'string', defaultValue: 'undefined', description: 'Timestamp or label for each item.' },
        ]} />
      </Section>
    </>
  )
}
