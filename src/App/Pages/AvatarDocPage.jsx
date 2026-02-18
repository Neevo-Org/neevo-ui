import { Avatar, Row, Text } from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

export function AvatarDocPage() {
  return (
    <>
      <Text tone="muted">Avatar displays profile photos with robust fallback initials when no image is available.</Text>
      <Section title="Examples">
        <Example
          title="Sizes + Fallback"
          code={`<Row>\n  <Avatar name="Neevo UI" size="sm" />\n  <Avatar name="Neevo UI" size="md" />\n  <Avatar name="Neevo UI" size="lg" />\n</Row>`}
        >
          <Row align="center">
            <Avatar name="Neevo UI" size="sm" />
            <Avatar name="Neevo UI" size="md" />
            <Avatar name="Neevo UI" size="lg" />
          </Row>
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable rows={[
          { prop: 'src', type: 'string', defaultValue: 'undefined', description: 'Image URL source.' },
          { prop: 'name', type: 'string', defaultValue: '""', description: 'Used to generate initials fallback.' },
          { prop: 'fallback', type: 'string', defaultValue: 'undefined', description: 'Manual fallback text override.' },
          { prop: 'size', type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: 'Avatar size variant.' },
        ]} />
      </Section>
    </>
  )
}

