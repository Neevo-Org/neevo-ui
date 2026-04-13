# Modal

Modal is a centered overlay for focused decisions and short-form editing. Use it when the user should pause, review, and confirm within a constrained surface.

## Examples

### Decision Modal

```tsx
import { useState } from 'react'

function ModalExample() {
  const [open, setOpen] = useState(false)

  return (
    <Column gap={8}>
      <Button variant="secondary" onClick={() => setOpen(true)}>Open modal</Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        size="lg"
        surface="tint"
        stickyFooter
      >
        <ModalHeader
          title="Invite member"
          description="Grant workspace access and define the initial role."
          meta={<Badge tone="primary" variant="soft">Access control</Badge>}
          onClose={() => setOpen(false)}
        />

        <ModalBody>
          <ModalSection
            title="Identity"
            description="Start with the member information that will be used for the invitation."
          >
            <Input label="Full name" placeholder="Avery Quinn" />
            <Input label="Email address" placeholder="avery@company.com" />
          </ModalSection>

          <ModalSection
            title="Permissions"
            description="Set the default level of access before sending the invite."
            aside={<Badge variant="soft">Required</Badge>}
          >
            <Select label="Role" placeholder="Choose a role" value="editor" onChange={() => {}}>
              <Options value="viewer">Viewer</Options>
              <Options value="editor">Editor</Options>
              <Options value="admin">Admin</Options>
            </Select>
            <TextArea
              label="Note"
              rows={4}
              placeholder="Optional onboarding note for the new member."
            />
          </ModalSection>
        </ModalBody>

        <ModalFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Send invite</Button>
        </ModalFooter>
      </Modal>
    </Column>
  )
}

<ModalExample />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| open | boolean | false | Visibility state. |
| onClose | () => void | undefined | Close callback. |
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Width preset for the modal shell. |
| surface | `'default' \| 'soft' \| 'tint'` | `'default'` | Background treatment for the modal shell. |
| stickyHeader | boolean | false | Keeps the header pinned while the body scrolls. |
| stickyFooter | boolean | false | Keeps the footer pinned while the body scrolls. |
| scroll | `'body' \| 'shell'` | `'body'` | Controls whether the body region or the entire shell scrolls. |
| locked | boolean | false | Disables backdrop and escape dismissal. |
| closeOnBackdrop | boolean | true | Backdrop click behavior. |
| closeOnEscape | boolean | true | ESC key behavior. |

## Subcomponents

| Component | Purpose |
| --- | --- |
| `ModalHeader` | Title, description, meta, and close action. |
| `ModalBody` | Main content region. |
| `ModalSection` | Group related fields or content blocks inside the body. |
| `ModalFooter` | Primary and secondary actions. |
