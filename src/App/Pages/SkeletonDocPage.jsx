import { Card, CardBody, Column, Row, Skeleton, Text } from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

export function SkeletonDocPage() {
  return (
    <>
      <Text tone="muted">Skeleton is used as a loading placeholder for text, cards, avatars, and other content blocks.</Text>
      <Section title="Examples">
        <Example
          title="Text + Avatar"
          code={`<Row>\n  <Skeleton variant="circle" width={40} height={40} />\n  <Column>\n    <Skeleton width="60%" />\n    <Skeleton width="85%" />\n  </Column>\n</Row>`}
        >
          <Row align="center">
            <Skeleton variant="circle" width={40} height={40} />
            <Column style={{ width: '100%' }}>
              <Skeleton width="60%" />
              <Skeleton width="85%" />
            </Column>
          </Row>
        </Example>
        <Example
          title="Card Placeholder"
          code={`<Card><CardBody><Skeleton variant="rect" height={120} /></CardBody></Card>`}
        >
          <Card elevated={false}>
            <CardBody>
              <Skeleton variant="rect" height={120} />
            </CardBody>
          </Card>
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable rows={[
          { prop: 'variant', type: '"text" | "rect" | "circle"', defaultValue: '"text"', description: 'Visual skeleton shape.' },
          { prop: 'width / height', type: 'number | string', defaultValue: 'depends on variant', description: 'Dimension overrides.' },
          { prop: 'animate', type: 'boolean', defaultValue: 'true', description: 'Shimmer animation toggle.' },
        ]} />
      </Section>
    </>
  )
}
