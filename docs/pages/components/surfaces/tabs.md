# Tabs

Tabs organize related content into a compact, switchable interface. The primitive now supports visual variants, density options, and full-width layouts.

## Examples

### Workspace Tabs

```tsx
import { useState } from 'react'

function TabsExample() {
  const [tab, setTab] = useState('overview')

  return (
    <Column gap={10}>
      <Text size="sm" tone="muted">Current tab: {tab}</Text>

      <Tabs value={tab} onValueChange={setTab} variant="soft" size="md">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Overview content</TabsContent>
        <TabsContent value="activity">Activity content</TabsContent>
        <TabsContent value="settings">Settings content</TabsContent>
      </Tabs>
    </Column>
  )
}

<TabsExample />
```

### Underline Tabs

```tsx
<Tabs defaultValue="tokens" variant="underline" size="sm">
  <TabsList>
    <TabsTrigger value="tokens">Tokens</TabsTrigger>
    <TabsTrigger value="components">Components</TabsTrigger>
    <TabsTrigger value="patterns">Patterns</TabsTrigger>
  </TabsList>
  <TabsContent value="tokens">Token guidance</TabsContent>
  <TabsContent value="components">Component guidance</TabsContent>
  <TabsContent value="patterns">Pattern guidance</TabsContent>
</Tabs>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value / defaultValue | string | undefined | Controlled or uncontrolled active tab. |
| onValueChange | `(value) => void` | undefined | Called on tab change. |
| variant | `'default' \| 'soft' \| 'tint' \| 'underline'` | `'default'` | Visual treatment for the tab list. |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Density preset for triggers. |
| fullWidth | boolean | false | Makes triggers stretch to share the row width. |
| forceMount | boolean | false | Keep inactive content mounted. |
