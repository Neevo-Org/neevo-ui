import {
  Button,
  Card,
  CardBody,
  Column,
  Container,
  Grid,
  Page,
  Options,
  Row,
  Text
} from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

export function LayoutDocPage() {
  return (
    <>
      <Text tone="muted">Layout system includes shell-level and micro-layout primitives: <code>Page</code>, <code>Container</code>, <code>Grid</code>, <code>Row</code>, <code>Column</code>.</Text>
      <Section title="Examples">
        <Example title="Dashboard Composition" code={`<Page><Container><Column><Row ... /><Grid ... /></Column></Container></Page>`}>
          <Page>
            <Container>
              <Column>
                <Row justify="space-between"><Text weight="semibold">Portfolio</Text><Button variant="secondary">Refresh</Button></Row>
                <Grid min={170}>
                  <Card elevated={false}><CardBody>Card A</CardBody></Card>
                  <Card elevated={false}><CardBody>Card B</CardBody></Card>
                  <Card elevated={false}><CardBody>Card C</CardBody></Card>
                </Grid>
              </Column>
            </Container>
          </Page>
        </Example>
      </Section>
      <Section title="Props Quick Reference">
        <PropsTable rows={[
          { prop: 'Page', type: 'component', defaultValue: '-', description: 'Top-level shell wrapper with full-height grid behavior.' },
          { prop: 'Container.width', type: 'number | string', defaultValue: '1200', description: 'Max content width.' },
          { prop: 'Grid.min', type: 'number | string', defaultValue: '220', description: 'Min card width in responsive grid.' },
          { prop: 'Row.align / justify / wrap', type: 'flex options', defaultValue: 'center / flex-start / true', description: 'Horizontal layout behavior.' },
          { prop: 'Column.align / justify', type: 'flex options', defaultValue: 'stretch / flex-start', description: 'Vertical layout behavior.' },
        ]} />
      </Section>
    </>
  )
}


