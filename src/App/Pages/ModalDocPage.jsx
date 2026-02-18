import { useState } from 'react'
import {
  Button,
  Column,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text
} from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

export function ModalDocPage() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Text tone="muted">Modal is a centered portal overlay with escape handling, overlay close, scroll lock, and composable sections.</Text>
      <Section title="Examples">
        <Example title="Action Modal" code={`<Modal open={open} onClose={...}>...</Modal>`}>
          <Button onClick={() => setOpen(true)}>Open modal</Button>
          <Modal open={open} onClose={() => setOpen(false)}>
            <ModalHeader title="Create Alert" onClose={() => setOpen(false)} />
            <ModalBody>
              <Column>
                <Input label="Symbol" placeholder="BTCUSD" />
                <Input label="Target" placeholder="70000" mode="float" />
              </Column>
            </ModalBody>
            <ModalFooter>
              <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Create</Button>
            </ModalFooter>
          </Modal>
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable rows={[
          { prop: 'open', type: 'boolean', defaultValue: 'false', description: 'Visibility state.' },
          { prop: 'onClose', type: '() => void', defaultValue: 'undefined', description: 'Close callback.' },
          { prop: 'closeOnEscape', type: 'boolean', defaultValue: 'true', description: 'ESC key behavior.' },
          { prop: 'closeOnOverlayClick', type: 'boolean', defaultValue: 'true', description: 'Overlay click behavior.' },
        ]} />
      </Section>
    </>
  )
}


