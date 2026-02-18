import {
  Button,
  Column,
  Text,
  Tooltip
} from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

export function TooltipDocPage() {
  return (
    <>
      <Text tone="muted">Tooltip is flexible: multiple trigger types, delays, placements, portal rendering, and interactive content mode.</Text>
      <Section title="Examples">
        <Example title="Hover" code={`<Tooltip content="Quick info"><Button>Hover</Button></Tooltip>`}>
          <Tooltip content="Market cap includes circulating supply assumptions.">
            <Button variant="secondary">Hover me</Button>
          </Tooltip>
        </Example>
        <Example title="Click + Rich Content" code={`<Tooltip trigger="click" interactive placement="bottom-start" content={<Column>...</Column>} />`}>
          <Tooltip
            trigger="click"
            interactive
            placement="bottom-start"
            content={<Column gap={6}><Text as="p" size="sm" weight="semibold">Tooltip Panel</Text><Text as="p" size="sm" tone="muted">Useful context without leaving the screen.</Text></Column>}
          >
            <Button variant="secondary">Click me</Button>
          </Tooltip>
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable rows={[
          { prop: 'trigger', type: '"hover" | "focus" | "click" | array', defaultValue: '["hover","focus"]', description: 'Opener events.' },
          { prop: 'placement', type: 'top/bottom/left/right + -start/-end', defaultValue: '"top"', description: 'Position strategy.' },
          { prop: 'interactive', type: 'boolean', defaultValue: 'false', description: 'Keeps tooltip open while pointer is over panel.' },
          { prop: 'showDelay / hideDelay', type: 'number (ms)', defaultValue: '120 / 80', description: 'Timing behavior.' },
        ]} />
      </Section>
    </>
  )
}


