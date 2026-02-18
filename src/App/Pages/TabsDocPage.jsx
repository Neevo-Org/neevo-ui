import { Tabs, TabsContent, TabsList, TabsTrigger, Text } from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

export function TabsDocPage() {
  return (
    <>
      <Text tone="muted">Tabs organize related content into a compact, switchable panel interface.</Text>
      <Section title="Examples">
        <Example
          title="Basic Tabs"
          code={`<Tabs defaultValue="overview">\n  <TabsList>\n    <TabsTrigger value="overview">Overview</TabsTrigger>\n    <TabsTrigger value="api">API</TabsTrigger>\n  </TabsList>\n  <TabsContent value="overview">Overview content</TabsContent>\n  <TabsContent value="api">API content</TabsContent>\n</Tabs>`}
        >
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Text size="sm">Overview content for the selected tab.</Text>
            </TabsContent>
            <TabsContent value="api">
              <Text size="sm">API details and code samples go here.</Text>
            </TabsContent>
          </Tabs>
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable rows={[
          { prop: 'value / defaultValue', type: 'string', defaultValue: 'undefined', description: 'Controlled or uncontrolled active tab.' },
          { prop: 'onValueChange', type: '(value) => void', defaultValue: 'undefined', description: 'Called on tab change.' },
          { prop: 'forceMount', type: 'boolean', defaultValue: 'false', description: 'Keep inactive content mounted.' },
        ]} />
      </Section>
    </>
  )
}
