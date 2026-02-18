import { Card, CardBody, Column, Divider, Row, Text } from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

export function DividerDocPage() {
  return (
    <>
      <Text tone="muted">Divider separates related content blocks visually in horizontal or vertical orientation.</Text>
      <Section title="Examples">
        <Example
          title="Horizontal + Vertical"
          code={`<Column>\n  <Text>Billing</Text>\n  <Divider label="OR" />\n  <Text>Personal</Text>\n</Column>`}
        >
          <Card elevated={false}>
            <CardBody>
              <Column>
                <Text>Billing address</Text>
                <Divider label="OR" />
                <Text>Personal address</Text>
                <Row align="center">
                  <Text size="sm">List</Text>
                  <Divider orientation="vertical" />
                  <Text size="sm">Grid</Text>
                </Row>
              </Column>
            </CardBody>
          </Card>
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable rows={[
          { prop: 'orientation', type: '"horizontal" | "vertical"', defaultValue: '"horizontal"', description: 'Direction of the separator line.' },
          { prop: 'label', type: 'string', defaultValue: 'undefined', description: 'Optional center label for horizontal divider.' },
        ]} />
      </Section>
    </>
  )
}

