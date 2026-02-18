import { useState } from 'react'
import {
  Button,
  Column,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Page,
  Switch,
  Text
} from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

export function DrawerDocPage() {
  const [openRight, setOpenRight] = useState(false)
  const [openLeft, setOpenLeft] = useState(false)
  return (
    <>
      <Text tone="muted">Drawer is a side-attached portal panel for settings and workflows that should preserve page context.</Text>
      <Section title="Examples">
        <Example title="Right Drawer" code={`<Drawer open={open} side="right" ... />`}>
          <Button onClick={() => setOpenRight(true)}>Open right drawer</Button>
          <Drawer open={openRight} onClose={() => setOpenRight(false)} side="right">
            <DrawerHeader title="Quick Settings" onClose={() => setOpenRight(false)} />
            <DrawerBody><Switch label="Auto-sync" defaultChecked /></DrawerBody>
            <DrawerFooter><Button onClick={() => setOpenRight(false)}>Done</Button></DrawerFooter>
          </Drawer>
        </Example>
        <Example title="Left Drawer" code={`<Drawer open={open} side="left" ... />`}>
          <Button variant="secondary" onClick={() => setOpenLeft(true)}>Open left drawer</Button>
          <Drawer open={openLeft} onClose={() => setOpenLeft(false)} side="left">
            <DrawerHeader title="Navigation" onClose={() => setOpenLeft(false)} />
            <DrawerBody><Column><Button variant="secondary">Dashboard</Button><Button variant="secondary">Orders</Button></Column></DrawerBody>
          </Drawer>
        </Example>
      </Section>
    </>
  )
}


