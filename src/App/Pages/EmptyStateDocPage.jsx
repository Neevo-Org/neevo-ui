import { Button, EmptyState, Text } from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

export function EmptyStateDocPage() {
  return (
    <>
      <Text tone="muted">EmptyState gives a reusable no-content message with icon and optional action.</Text>
      <Section title="Examples">
        <Example
          title="With Action"
          code={`<EmptyState\n  icon="inbox"\n  title="No reports yet"\n  description="Generate your first report to see data."\n  actionLabel="Create report"\n/>`}
        >
          <EmptyState
            icon="inbox"
            title="No reports yet"
            description="Generate your first report to see data."
            actionLabel="Create report"
            onAction={() => {}}
          />
        </Example>
        <Example
          title="Custom Action Slot"
          code={`<EmptyState action={<Button>Connect</Button>} />`}
        >
          <EmptyState
            icon="cloud_off"
            title="No data source connected"
            description="Connect a provider to start syncing records."
            action={<Button>Connect provider</Button>}
          />
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable rows={[
          { prop: 'icon', type: 'string', defaultValue: '"inbox"', description: 'Material icon name.' },
          { prop: 'title', type: 'string', defaultValue: '"No data yet"', description: 'Main heading text.' },
          { prop: 'description', type: 'string', defaultValue: 'default helper text', description: 'Supporting explanation text.' },
          { prop: 'actionLabel / onAction', type: 'string / function', defaultValue: 'undefined', description: 'Quick CTA button API.' },
          { prop: 'action', type: 'ReactNode', defaultValue: 'undefined', description: 'Fully custom action slot.' },
        ]} />
      </Section>
    </>
  )
}
