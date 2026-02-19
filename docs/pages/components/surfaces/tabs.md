# Tabs

Tabs organize related content into a compact, switchable panel interface.

## Examples

### Basic Tabs

```tsx
import { useState } from 'react'

function TabsExample() {
  const [tab, setTab] = useState('overview')

  return (
    <Column gap={8}>
      <Text size="sm" tone="muted">Current tab: {tab}</Text>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Overview content</TabsContent>
        <TabsContent value="api">API content</TabsContent>
      </Tabs>
    </Column>
  )
}

<TabsExample />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value / defaultValue | string | undefined | Controlled or uncontrolled active tab. |
| onValueChange | (value) => void | undefined | Called on tab change. |
| forceMount | boolean | false | Keep inactive content mounted. |
