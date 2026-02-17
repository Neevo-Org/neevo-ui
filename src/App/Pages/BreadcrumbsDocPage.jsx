import { Breadcrumbs, Text } from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

const ITEMS = [
  { label: 'Home', href: '#/' },
  { label: 'Components', href: '#/layout' },
  { label: 'Breadcrumbs' },
]

export function BreadcrumbsDocPage() {
  return (
    <>
      <Text tone="muted">Breadcrumbs show hierarchical navigation and current position in the app structure.</Text>
      <Section title="Examples">
        <Example
          title="Path Navigation"
          code={`<Breadcrumbs items={items} />`}
        >
          <Breadcrumbs items={ITEMS} />
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable rows={[
          { prop: 'items', type: 'Array<{ label, href?, key? }>', defaultValue: '[]', description: 'Ordered breadcrumb items.' },
          { prop: 'separator', type: 'string', defaultValue: '"chevron_right"', description: 'Material icon name used as separator.' },
        ]} />
      </Section>
    </>
  )
}
