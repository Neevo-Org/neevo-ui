import { Badge, Row, Text } from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

export function BadgeDocPage() {
  return (
    <>
      <Text tone="muted">Badge highlights statuses, labels, and compact metadata with semantic tones.</Text>
      <Section title="Examples">
        <Example
          title="Tone Variants"
          code={`<Row>\n  <Badge>Neutral</Badge>\n  <Badge tone="success">Success</Badge>\n  <Badge tone="warning">Warning</Badge>\n  <Badge tone="danger">Danger</Badge>\n</Row>`}
        >
          <Row>
            <Badge>Neutral</Badge>
            <Badge tone="success">Success</Badge>
            <Badge tone="warning">Warning</Badge>
            <Badge tone="danger">Danger</Badge>
            <Badge variant="outline">Outline</Badge>
          </Row>
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable rows={[
          { prop: 'tone', type: '"neutral" | "success" | "warning" | "danger"', defaultValue: '"neutral"', description: 'Semantic color tone.' },
          { prop: 'variant', type: '"soft" | "outline"', defaultValue: '"soft"', description: 'Fill style appearance.' },
          { prop: 'children', type: 'ReactNode', defaultValue: 'undefined', description: 'Badge content.' },
        ]} />
      </Section>
    </>
  )
}

