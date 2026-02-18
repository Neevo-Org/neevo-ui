import {
  Column,
  Heading,
  Text
} from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

export function TextDocPage() {
  return (
    <>
      <Text tone="muted">Typography primitives centralize text tone, weight, size, alignment, and heading scale.</Text>
      <Section title="Examples">
        <Example title="Text Variants" code={`<Text size="xs" tone="muted">caption</Text>\n<Text size="md" weight="semibold">body</Text>`}>
          <Column>
            <Text size="xs" tone="muted">Caption / helper</Text>
            <Text size="sm">Small text</Text>
            <Text size="md" weight="semibold">Body emphasized</Text>
            <Text size="lg">Large lead text</Text>
          </Column>
        </Example>
        <Example title="Heading Scale" code={`<Heading as="h1" size="xl">Title</Heading>`}>
          <Column>
            <Heading as="h1" size="xl">Heading XL</Heading>
            <Heading as="h2" size="lg">Heading LG</Heading>
            <Heading as="h3" size="md">Heading MD</Heading>
            <Heading as="h4" size="sm">Heading SM</Heading>
          </Column>
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable rows={[
          { prop: 'Text.size', type: 'xs|sm|md|lg', defaultValue: 'md', description: 'Text size token.' },
          { prop: 'Text.weight', type: 'regular|medium|semibold|bold', defaultValue: 'regular', description: 'Font weight token.' },
          { prop: 'Text.tone', type: 'default|muted', defaultValue: 'default', description: 'Color tone token.' },
          { prop: 'Heading.size', type: 'sm|md|lg|xl', defaultValue: 'lg', description: 'Heading scale token.' },
        ]} />
      </Section>
    </>
  )
}


