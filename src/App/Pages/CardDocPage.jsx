import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text
} from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

export function CardDocPage() {
  return (
    <>
      <Text tone="muted">Card family composes content regions with consistent spacing and optional elevated style.</Text>
      <Section title="Examples">
        <Example title="Structured Card" code={`<Card><CardHeader /> <CardBody /> <CardFooter /></Card>`}>
          <Card>
            <CardHeader><Heading as="h3" size="sm">Starter Plan</Heading></CardHeader>
            <CardBody><Text tone="muted" size="sm">Good for lightweight dashboards and internal tools.</Text></CardBody>
            <CardFooter><Button>Choose</Button></CardFooter>
          </Card>
        </Example>
        <Example title="Flat Card" code={`<Card elevated={false}>...</Card>`}>
          <Card elevated={false}><CardBody>Flat surface card with no shadow.</CardBody></Card>
        </Example>
      </Section>
    </>
  )
}


