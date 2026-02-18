import {
  I,
  Row,
  Text
} from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

export function IconDocPage() {
  return (
    <>
      <Text tone="muted">Icon primitive wraps Google Material Symbols with alias resolution and optional filled mode.</Text>
      <Section title="Examples">
        <Example title="Basic" code={`<I>arrow</I>\n<I>expand_more</I>`}>
          <Row>
            <I>arrow</I>
            <I>expand_more</I>
            <I>check_circle</I>
          </Row>
        </Example>
        <Example title="Filled" code={`<I filled>favorite</I>`}>
          <I filled>favorite</I>
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable rows={[
          { prop: 'children', type: 'string', defaultValue: 'required', description: 'Icon ligature name (alias supported).' },
          { prop: 'filled', type: 'boolean', defaultValue: 'false', description: 'Uses filled variant settings.' },
          { prop: 'className', type: 'string', defaultValue: '""', description: 'Class composition hook.' },
        ]} />
      </Section>
    </>
  )
}


