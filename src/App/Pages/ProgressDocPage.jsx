import { CircularProgress, Column, Progress, Row, Text } from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

export function ProgressDocPage() {
  return (
    <>
      <Text tone="muted">Progress communicates completion states for tasks, uploads, and async processes.</Text>
      <Section title="Examples">
        <Example
          title="Linear + Circular"
          code={`<Column>\n  <Progress value={64} />\n  <Row>\n    <CircularProgress value={64} showValue />\n  </Row>\n</Column>`}
        >
          <Column>
            <Progress value={64} />
            <Row>
              <CircularProgress value={64} showValue />
            </Row>
          </Column>
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable rows={[
          { prop: 'value', type: 'number', defaultValue: '0', description: 'Progress percentage between 0 and 100.' },
          { prop: 'size', type: 'number', defaultValue: '48', description: 'Circular size in pixels.' },
          { prop: 'stroke', type: 'number', defaultValue: '5', description: 'Circular track stroke width.' },
          { prop: 'showValue', type: 'boolean', defaultValue: 'false', description: 'Show centered percentage label.' },
        ]} />
      </Section>
    </>
  )
}
