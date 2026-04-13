# Drawer

Drawer is a side workspace for longer flows, inspection panels, and contextual editing that should preserve the page behind it.

## Examples

### Workflow Drawer

```tsx
import { useState } from 'react'

function DrawerExample() {
  const [open, setOpen] = useState(false)

  return (
    <Column gap={8}>
      <Button variant="secondary" onClick={() => setOpen(true)}>Open drawer</Button>

      <Drawer
        open={open}
        side="right"
        size="lg"
        surface="soft"
        stickyHeader
        stickyFooter
        onClose={() => setOpen(false)}
      >
        <DrawerHeader
          title="Transaction review"
          description="Inspect the record and update the details without leaving the current page."
          meta={<Badge tone="warning" variant="soft">Needs review</Badge>}
          onClose={() => setOpen(false)}
        />

        <DrawerBody>
          <DrawerSection
            title="General"
            description="Top-level fields that define the movement."
          >
            <Input label="Title" defaultValue="April supplier transfer" />
            <Select label="Status" value="pending" onChange={() => {}}>
              <Options value="draft">Draft</Options>
              <Options value="pending">Pending</Options>
              <Options value="posted">Posted</Options>
            </Select>
          </DrawerSection>

          <DrawerSection
            title="Allocation"
            description="Assign the movement to the correct internal bucket."
            aside={<Badge variant="soft">2 fields</Badge>}
          >
            <Select label="Account" value="ops" onChange={() => {}}>
              <Options value="ops">Operations</Options>
              <Options value="reserve">Reserve</Options>
              <Options value="cards">Cards</Options>
            </Select>
            <Input label="Amount" mode="float" defaultValue="4800.00" />
          </DrawerSection>

          <DrawerSection
            title="Notes"
            description="Provide extra context for reviewers and later audit passes."
          >
            <TextArea rows={5} placeholder="Describe why this transaction needs review." />
          </DrawerSection>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>Close</Button>
          <Button onClick={() => setOpen(false)}>Save changes</Button>
        </DrawerFooter>
      </Drawer>
    </Column>
  )
}

<DrawerExample />
```

### Left Drawer

```tsx
import { useState } from 'react'

function LeftDrawerExample() {
  const [open, setOpen] = useState(false)

  return (
    <Column gap={8}>
      <Button variant="secondary" onClick={() => setOpen(true)}>Open left drawer</Button>

      <Drawer
        open={open}
        side="left"
        size="md"
        surface="tint"
        onClose={() => setOpen(false)}
      >
        <DrawerHeader
          title="Workspace shortcuts"
          description="Use a drawer from the left when the content behaves like contextual navigation."
          onClose={() => setOpen(false)}
        />

        <DrawerBody>
          <DrawerSection title="Pinned views">
            <Column gap={8}>
              <Button variant="ghost">Overview</Button>
              <Button variant="ghost">Spending</Button>
              <Button variant="ghost">Recurring</Button>
            </Column>
          </DrawerSection>
        </DrawerBody>
      </Drawer>
    </Column>
  )
}

<LeftDrawerExample />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| open | boolean | false | Visibility state. |
| onClose | () => void | undefined | Close callback. |
| side | `'left' \| 'right'` | `'right'` | Drawer attachment side. |
| size | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Width preset for the drawer shell. |
| surface | `'default' \| 'soft' \| 'tint'` | `'default'` | Background treatment for the drawer shell. |
| stickyHeader | boolean | false | Keeps the header pinned while the body scrolls. |
| stickyFooter | boolean | false | Keeps the footer pinned while the body scrolls. |
| scroll | `'body' \| 'shell'` | `'body'` | Controls whether the body region or the entire shell scrolls. |
| locked | boolean | false | Disables backdrop and escape dismissal. |
| closeOnBackdrop | boolean | true | Backdrop click behavior. |
| closeOnEscape | boolean | true | ESC key behavior. |

## Subcomponents

| Component | Purpose |
| --- | --- |
| `DrawerHeader` | Title, description, meta, and close action. |
| `DrawerBody` | Main content region. |
| `DrawerSection` | Group related content inside the drawer body. |
| `DrawerFooter` | Footer actions for review or save flows. |
