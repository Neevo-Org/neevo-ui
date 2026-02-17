import { useEffect, useState } from 'react'
import './App.css'
import {
  Button,
  Calendar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Column,
  Container,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Grid,
  Heading,
  I,
  Input,
  Page,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Options,
  RadioGroup,
  RadioOption,
  Row,
  Select,
  Switch,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
  Text,
  TextArea,
  ThemeProvider,
  Tooltip,
} from '../lib'

const PAGE_LIST = [
  { id: 'button', label: 'Button' },
  { id: 'input', label: 'Input' },
  { id: 'textarea', label: 'TextArea' },
  { id: 'checkbox', label: 'Checkbox' },
  { id: 'switch', label: 'Switch' },
  { id: 'radiogroup', label: 'RadioGroup' },
  { id: 'select', label: 'Select' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'table', label: 'Table' },
  { id: 'tooltip', label: 'Tooltip' },
  { id: 'modal', label: 'Modal' },
  { id: 'drawer', label: 'Drawer' },
  { id: 'layout', label: 'Layout System' },
  { id: 'card', label: 'Card' },
  { id: 'text', label: 'Text / Heading' },
  { id: 'themeprovider', label: 'ThemeProvider' },
  { id: 'icon', label: 'I (Icons)' },
]

function getPageFromHash() {
  const raw = window.location.hash.replace('#/', '').trim().toLowerCase()
  return PAGE_LIST.some((p) => p.id === raw) ? raw : PAGE_LIST[0].id
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function highlightCode(code) {
  const html = escapeHtml(code)
  const pattern =
    /(\/\/.*$)|(`[^`]*`|"[^"\n]*"|'[^'\n]*')|(&lt;\/?)([A-Za-z][\w-]*)|(\b[a-zA-Z_]\w*)(=)|\b(\d+(?:\.\d+)?)\b|\b(import|from|const|let|var|return|function|if|else|true|false|null|undefined|export|default)\b/gm

  return html.replace(
    pattern,
    (
      match,
      comment,
      stringLiteral,
      tagPrefix,
      tagName,
      propName,
      propEquals,
      numberLiteral,
      keyword,
    ) => {
      if (comment) {
        return `<span class="tok-comment">${comment}</span>`
      }
      if (stringLiteral) {
        return `<span class="tok-string">${stringLiteral}</span>`
      }
      if (tagPrefix && tagName) {
        return `${tagPrefix}<span class="tok-tag">${tagName}</span>`
      }
      if (propName && propEquals) {
        return `<span class="tok-prop">${propName}</span>${propEquals}`
      }
      if (numberLiteral) {
        return `<span class="tok-number">${numberLiteral}</span>`
      }
      if (keyword) {
        return `<span class="tok-keyword">${keyword}</span>`
      }
      return match
    },
  )
}

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      const area = document.createElement('textarea')
      area.value = code
      document.body.appendChild(area)
      area.select()
      document.execCommand('copy')
      document.body.removeChild(area)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <div className="docs-code-wrap">
      <button type="button" className={copied ? 'docs-copy docs-copy--done' : 'docs-copy'} onClick={handleCopy}>
        {copied ? 'Copied' : 'Copy'}
      </button>
      <pre className="docs-code">
        <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
      </pre>
    </div>
  )
}

function PropsTable({ rows }) {
  return (
    <div className="docs-table-wrap">
      <table className="docs-table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.prop}>
              <td><code>{row.prop}</code></td>
              <td><code>{row.type}</code></td>
              <td><code>{row.defaultValue}</code></td>
              <td>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <section className="docs-section">
      <Heading as="h2" size="md">{title}</Heading>
      {children}
    </section>
  )
}

function Example({ title, children, code }) {
  return (
    <Card className="docs-example-card">
      <CardHeader>
        <Heading as="h3" size="sm">{title}</Heading>
      </CardHeader>
      <CardBody>
        <div className="docs-preview">{children}</div>
        <CodeBlock code={code} />
      </CardBody>
    </Card>
  )
}

function ButtonDocs() {
  return (
    <>
      <Text tone="muted">Buttons support clear variant semantics and can be composed with icons and custom sizing classes.</Text>
      <Section title="Examples">
        <Example
          title="Variants"
          code={`<Button>Primary</Button>\n<Button variant="secondary">Secondary</Button>`}
        >
          <Row>
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
          </Row>
        </Example>
        <Example
          title="With Icon"
          code={`<Button variant="secondary"><I>arrow</I> Continue</Button>`}
        >
          <Button variant="secondary"><I>arrow</I> Continue</Button>
        </Example>
        <Example
          title="Disabled"
          code={`<Button disabled>Disabled</Button>`}
        >
          <Button disabled>Disabled</Button>
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable
          rows={[
            { prop: 'variant', type: '"primary" | "secondary"', defaultValue: '"primary"', description: 'Visual style variant.' },
            { prop: 'type', type: '"button" | "submit" | "reset"', defaultValue: '"button"', description: 'Native button type.' },
            { prop: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disables interaction.' },
            { prop: 'className', type: 'string', defaultValue: '""', description: 'Custom class composition.' },
          ]}
        />
      </Section>
    </>
  )
}

function InputDocs() {
  const [email, setEmail] = useState('')
  const [qty, setQty] = useState('5')
  const [risk, setRisk] = useState('1.25')

  return (
    <>
      <Text tone="muted">Input supports restrictive numeric modes while keeping native browser constraints and full controlled behavior.</Text>
      <Section title="Examples">
        <Example
          title="Text Input with Icons"
          code={`<Input label="Email" leadingIcon="mail" trailingIcon="alternate_email" />`}
        >
          <Input label="Email" placeholder="trader@desk.com" leadingIcon="mail" trailingIcon="alternate_email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Example>
        <Example
          title="Integer Restriction"
          code={`<Input mode="integer" min={1} max={100} maxLength={3} />`}
        >
          <Input label="Quantity" mode="integer" min={1} max={100} maxLength={3} value={qty} onChange={(e) => setQty(e.target.value)} hint="Clamped on blur" />
        </Example>
        <Example
          title="Float Restriction"
          code={`<Input mode="float" min={0} max={5} />`}
        >
          <Input label="Risk %" mode="float" min={0} max={5} value={risk} onChange={(e) => setRisk(e.target.value)} hint="Supports decimal and negative guard" />
        </Example>
        <Example
          title="Disabled and Error"
          code={`<Input disabled value="Locked" />\n<Input error="Invalid value" />`}
        >
          <Row align="flex-start">
            <Input label="Disabled" disabled value="Locked field" />
            <Input label="Error" value="abc" error="Only numbers are allowed" />
          </Row>
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable
          rows={[
            { prop: 'mode', type: '"text" | "integer" | "float"', defaultValue: '"text"', description: 'Sanitization strategy during input.' },
            { prop: 'min / max', type: 'number', defaultValue: 'undefined', description: 'Clamp limits for numeric modes on blur.' },
            { prop: 'maxLength', type: 'number', defaultValue: 'undefined', description: 'Maximum character length (enforced).' },
            { prop: 'disabled / dissabled', type: 'boolean', defaultValue: 'false', description: 'Disables field interaction.' },
            { prop: 'leadingIcon / trailingIcon', type: 'string', defaultValue: 'undefined', description: 'Material icon names shown in input shell.' },
            { prop: 'label / hint / error', type: 'string', defaultValue: 'undefined', description: 'Field metadata text.' },
          ]}
        />
      </Section>
    </>
  )
}

function TextAreaDocs() {
  const [note, setNote] = useState('')
  return (
    <>
      <Text tone="muted">TextArea mirrors Input styling with larger editable region and vertical resize support.</Text>
      <Section title="Examples">
        <Example
          title="Basic Notes"
          code={`<TextArea label="Trade note" rows={5} />`}
        >
          <TextArea label="Trade note" rows={5} placeholder="Describe setup, trigger, invalidation, target..." value={note} onChange={(e) => setNote(e.target.value)} hint="Markdown-style plain text works well." />
        </Example>
        <Example
          title="Error State"
          code={`<TextArea error="Please add at least 30 characters" />`}
        >
          <TextArea label="Review" value="Too short" error="Please add at least 30 characters" />
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable
          rows={[
            { prop: 'rows', type: 'number', defaultValue: '4', description: 'Initial visible text rows.' },
            { prop: 'label / hint / error', type: 'string', defaultValue: 'undefined', description: 'Field metadata text.' },
            { prop: 'className', type: 'string', defaultValue: '""', description: 'Wrapper class override.' },
          ]}
        />
      </Section>
    </>
  )
}

function CheckboxDocs() {
  const [checked, setChecked] = useState(true)
  return (
    <>
      <Text tone="muted">Checkbox supports labeled single selection with animated check transitions.</Text>
      <Section title="Examples">
        <Example title="Basic" code={`<Checkbox label="Risk alerts" checked={state} onChange={...} />`}>
          <Checkbox label="Risk alerts" description="Notify when stop levels are hit" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
        </Example>
        <Example title="Multiple" code={`<Checkbox label="Email" />\n<Checkbox label="Push" />`}>
          <Column>
            <Checkbox label="Email notifications" defaultChecked />
            <Checkbox label="Push notifications" />
            <Checkbox label="SMS notifications" />
          </Column>
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable
          rows={[
            { prop: 'label', type: 'string', defaultValue: 'undefined', description: 'Primary option label.' },
            { prop: 'description', type: 'string', defaultValue: 'undefined', description: 'Secondary explanatory text.' },
            { prop: 'checked / defaultChecked', type: 'boolean', defaultValue: 'false', description: 'Controlled/uncontrolled checked state.' },
          ]}
        />
      </Section>
    </>
  )
}

function SwitchDocs() {
  const [sync, setSync] = useState(false)
  return (
    <>
      <Text tone="muted">Switch is a binary control with animated thumb icon morph and compact expressive track style.</Text>
      <Section title="Examples">
        <Example title="Interactive" code={`<Switch label="Auto-sync" checked={sync} onChange={...} />`}>
          <Switch label="Auto-sync watchlist" description="Sync every 30 seconds" checked={sync} onChange={(e) => setSync(e.target.checked)} />
        </Example>
        <Example title="Disabled" code={`<Switch disabled checked />`}>
          <Switch label="Locked setting" checked disabled />
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable
          rows={[
            { prop: 'label / description', type: 'string', defaultValue: 'undefined', description: 'Text shown next to the control.' },
            { prop: 'checked / defaultChecked', type: 'boolean', defaultValue: 'false', description: 'Controlled/uncontrolled state.' },
            { prop: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Disables interaction.' },
          ]}
        />
      </Section>
    </>
  )
}

function RadioGroupDocs() {
  const [mode, setMode] = useState('balanced')
  return (
    <>
      <Text tone="muted">RadioGroup composes RadioOption children and manages single-value selection with controlled value API.</Text>
      <Section title="Examples">
        <Example
          title="Risk Mode"
          code={`<RadioGroup value={mode} onChange={setMode}>\n  <RadioOption value="conservative" label="Conservative" />\n</RadioGroup>`}
        >
          <RadioGroup label="Risk mode" description="Controls position sizing presets" value={mode} onChange={setMode} name="risk-mode-docs">
            <RadioOption value="conservative" label="Conservative" description="Lower exposure" />
            <RadioOption value="balanced" label="Balanced" description="Default profile" />
            <RadioOption value="aggressive" label="Aggressive" description="Higher exposure" />
          </RadioGroup>
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable
          rows={[
            { prop: 'value', type: 'string', defaultValue: 'undefined', description: 'Selected option value (controlled).' },
            { prop: 'onChange', type: '(value) => void', defaultValue: 'undefined', description: 'Fired when option changes.' },
            { prop: 'name', type: 'string', defaultValue: 'undefined', description: 'Shared radio input name.' },
          ]}
        />
      </Section>
    </>
  )
}

function SelectDocs() {
  const [asset, setAsset] = useState('btc')
  const [interval, setInterval] = useState('1d')
  return (
    <>
      <Text tone="muted">Select uses declarative <code>Options</code> children, optional search, and composable keyword filtering.</Text>
      <Section title="Examples">
        <Example
          title="Searchable"
          code={`<Select value={asset} onChange={setAsset} search>\n  <Options value="btc" keywords="bitcoin">BTC</Options>\n</Select>`}
        >
          <Select value={asset} onChange={setAsset} search placeholder="Choose asset">
            <Options value="btc" keywords="bitcoin crypto">BTC / USD</Options>
            <Options value="eth" keywords="ethereum crypto">ETH / USD</Options>
            <Options value="sol" keywords="solana">SOL / USD</Options>
          </Select>
        </Example>
        <Example
          title="Non-searchable"
          code={`<Select value={interval} onChange={setInterval} search={false}>...</Select>`}
        >
          <Select value={interval} onChange={setInterval} search={false} placeholder="Choose interval">
            <Options value="1h">1 Hour</Options>
            <Options value="4h">4 Hours</Options>
            <Options value="1d">1 Day</Options>
            <Options value="1w">1 Week</Options>
          </Select>
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable rows={[
          { prop: 'search', type: 'boolean', defaultValue: 'true', description: 'Enables search input and filtering.' },
          { prop: 'searchable', type: 'boolean', defaultValue: 'undefined', description: 'Backward-compatible alias; overrides search when provided.' },
          { prop: 'value', type: 'string', defaultValue: 'undefined', description: 'Selected option value.' },
          { prop: 'onChange', type: '(value) => void', defaultValue: 'undefined', description: 'Selection change callback.' },
          { prop: 'placeholder', type: 'string', defaultValue: '"Select an option"', description: 'Placeholder text.' },
        ]} />
      </Section>
    </>
  )
}

function CalendarDocs() {
  const [date, setDate] = useState(new Date())
  return (
    <>
      <Text tone="muted">Calendar supports month navigation, year picker mode, selectable date state, and themed day styles.</Text>
      <Section title="Examples">
        <Example title="Controlled Date" code={`<Calendar value={date} onChange={setDate} />`}>
          <Column>
            <Calendar value={date} onChange={setDate} />
            <Text size="sm" tone="muted">Selected: {date.toLocaleDateString()}</Text>
          </Column>
        </Example>
      </Section>
      <Section title="Behavior Notes">
        <ul className="docs-list">
          <li>Header arrows navigate month view.</li>
          <li>Clicking month label toggles year grid.</li>
          <li>In year mode arrows paginate year ranges.</li>
          <li>Supports controlled and uncontrolled value usage.</li>
        </ul>
      </Section>
    </>
  )
}

function TableDocs() {
  return (
    <>
      <Text tone="muted">Table supports internal sorting, sortable headers, numeric alignment, and semantic section primitives.</Text>
      <Section title="Examples">
        <Example
          title="Internally Sorted Table"
          code={`<Table defaultSort={{ key: 'price', direction: 'desc' }}>\n  <TableCell as="th" sortable sortKey="price">Price</TableCell>\n</Table>`}
        >
          <Table defaultSort={{ key: 'asset', direction: 'asc' }}>
            <TableCaption>Click headers to sort</TableCaption>
            <TableHead>
              <TableRow>
                <TableCell as="th" sortable sortKey="asset">Asset</TableCell>
                <TableCell as="th" align="right" sortable sortKey="price">Price</TableCell>
                <TableCell as="th" align="right" sortable sortKey="change">24h</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sortKey="asset" sortValue="BTC">BTC</TableCell>
                <TableCell numeric sortKey="price" sortValue={68420}>$68,420</TableCell>
                <TableCell numeric sortKey="change" sortValue={2.41}>+2.41%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sortKey="asset" sortValue="ETH">ETH</TableCell>
                <TableCell numeric sortKey="price" sortValue={3420}>$3,420</TableCell>
                <TableCell numeric sortKey="change" sortValue={1.33}>+1.33%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sortKey="asset" sortValue="SOL">SOL</TableCell>
                <TableCell numeric sortKey="price" sortValue={142}>$142</TableCell>
                <TableCell numeric sortKey="change" sortValue={-0.48}>-0.48%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable rows={[
          { prop: 'defaultSort', type: '{ key: string, direction: "asc" | "desc" }', defaultValue: '{ key: null, direction: "asc" }', description: 'Initial internal sort state.' },
          { prop: 'sort / onSortChange', type: 'controlled sort API', defaultValue: 'undefined', description: 'Optional controlled sort mode.' },
          { prop: 'sortKey', type: 'string', defaultValue: 'undefined', description: 'Sort identity for header and cell.' },
          { prop: 'sortValue', type: 'string | number', defaultValue: 'children', description: 'Value used during sort comparison.' },
        ]} />
      </Section>
    </>
  )
}

function TooltipDocs() {
  return (
    <>
      <Text tone="muted">Tooltip is flexible: multiple trigger types, delays, placements, portal rendering, and interactive content mode.</Text>
      <Section title="Examples">
        <Example title="Hover" code={`<Tooltip content="Quick info"><Button>Hover</Button></Tooltip>`}>
          <Tooltip content="Market cap includes circulating supply assumptions.">
            <Button variant="secondary">Hover me</Button>
          </Tooltip>
        </Example>
        <Example title="Click + Rich Content" code={`<Tooltip trigger="click" interactive placement="bottom-start" content={<div>...</div>} />`}>
          <Tooltip
            trigger="click"
            interactive
            placement="bottom-start"
            content={<div><Text as="p" size="sm" weight="semibold">Tooltip Panel</Text><Text as="p" size="sm" tone="muted">Useful context without leaving the screen.</Text></div>}
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

function ModalDocs() {
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

function DrawerDocs() {
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

function LayoutDocs() {
  return (
    <>
      <Text tone="muted">Layout system includes shell-level and micro-layout primitives: <code>Page</code>, <code>Container</code>, <code>Grid</code>, <code>Row</code>, <code>Column</code>.</Text>
      <Section title="Examples">
        <Example title="Dashboard Composition" code={`<Page><Container><Column><Row ... /><Grid ... /></Column></Container></Page>`}>
          <Page>
            <Container>
              <Column>
                <Row justify="space-between"><Text weight="semibold">Portfolio</Text><Button variant="secondary">Refresh</Button></Row>
                <Grid min={170}>
                  <Card elevated={false}><CardBody>Card A</CardBody></Card>
                  <Card elevated={false}><CardBody>Card B</CardBody></Card>
                  <Card elevated={false}><CardBody>Card C</CardBody></Card>
                </Grid>
              </Column>
            </Container>
          </Page>
        </Example>
      </Section>
      <Section title="Props Quick Reference">
        <PropsTable rows={[
          { prop: 'Page', type: 'component', defaultValue: '-', description: 'Top-level shell wrapper with full-height grid behavior.' },
          { prop: 'Container.width', type: 'number | string', defaultValue: '1200', description: 'Max content width.' },
          { prop: 'Grid.min', type: 'number | string', defaultValue: '220', description: 'Min card width in responsive grid.' },
          { prop: 'Row.align / justify / wrap', type: 'flex options', defaultValue: 'center / flex-start / true', description: 'Horizontal layout behavior.' },
          { prop: 'Column.align / justify', type: 'flex options', defaultValue: 'stretch / flex-start', description: 'Vertical layout behavior.' },
        ]} />
      </Section>
    </>
  )
}

function CardDocs() {
  return (
    <>
      <Text tone="muted">Card family composes content regions with consistent spacing and optional elevated style.</Text>
      <Section title="Examples">
        <Example title="Structured Card" code={`<Card><CardHeader /> <CardBody /> <CardFooter /></Card>`}>
          <Card>
            <CardHeader><Heading as="h3" size="sm">Starter Plan</Heading></CardHeader>
            <CardBody><Text tone="muted" size="sm">Good for lightweight dashboards and internal tools.</Text></CardBody>
            <CardFooter><Button>Choose</Button></CardFooter>
          </Card>
        </Example>
        <Example title="Flat Card" code={`<Card elevated={false}>...</Card>`}>
          <Card elevated={false}><CardBody>Flat surface card with no shadow.</CardBody></Card>
        </Example>
      </Section>
    </>
  )
}

function TextDocs() {
  return (
    <>
      <Text tone="muted">Typography primitives centralize text tone, weight, size, alignment, and heading scale.</Text>
      <Section title="Examples">
        <Example title="Text Variants" code={`<Text size="xs" tone="muted">caption</Text>\n<Text size="md" weight="semibold">body</Text>`}>
          <Column>
            <Text size="xs" tone="muted">Caption / helper</Text>
            <Text size="sm">Small text</Text>
            <Text size="md" weight="semibold">Body emphasized</Text>
            <Text size="lg">Large lead text</Text>
          </Column>
        </Example>
        <Example title="Heading Scale" code={`<Heading as="h1" size="xl">Title</Heading>`}>
          <Column>
            <Heading as="h1" size="xl">Heading XL</Heading>
            <Heading as="h2" size="lg">Heading LG</Heading>
            <Heading as="h3" size="md">Heading MD</Heading>
            <Heading as="h4" size="sm">Heading SM</Heading>
          </Column>
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable rows={[
          { prop: 'Text.size', type: 'xs|sm|md|lg', defaultValue: 'md', description: 'Text size token.' },
          { prop: 'Text.weight', type: 'regular|medium|semibold|bold', defaultValue: 'regular', description: 'Font weight token.' },
          { prop: 'Text.tone', type: 'default|muted', defaultValue: 'default', description: 'Color tone token.' },
          { prop: 'Heading.size', type: 'sm|md|lg|xl', defaultValue: 'lg', description: 'Heading scale token.' },
        ]} />
      </Section>
    </>
  )
}

function ThemeProviderDocs() {
  return (
    <>
      <Text tone="muted">ThemeProvider scopes light/dark tokens and allows runtime CSS variable overrides for full branding control.</Text>
      <Section title="Examples">
        <Example title="Dark Mode Scope" code={`<ThemeProvider mode="dark">...</ThemeProvider>`}>
          <ThemeProvider mode="dark" className="docs-dark-sample">
            <Card>
              <CardBody>
                <Text tone="muted">Dark themed card section</Text>
                <Button>Primary Action</Button>
              </CardBody>
            </Card>
          </ThemeProvider>
        </Example>
        <Example title="Brand Override" code={`<ThemeProvider style={{ '--nv-color-primary-bg': '#22c55e' }}>...</ThemeProvider>`}>
          <ThemeProvider
            className="docs-brand-sample"
            style={{
              '--nv-color-primary-bg': '#22c55e',
              '--nv-color-primary-bg-hover': '#16a34a',
              '--nv-color-primary-fg': '#052e16',
            }}
          >
            <Row>
              <Button>Green Brand</Button>
              <Button variant="secondary">Secondary</Button>
            </Row>
          </ThemeProvider>
        </Example>
      </Section>
      <Section title="Core Tokens">
        <CodeBlock code={`--nv-color-bg\n--nv-color-surface\n--nv-color-text\n--nv-color-primary-bg\n--nv-color-primary-fg\n--nv-color-border\n--nv-shadow-sm\n--nv-radius-md / --nv-radius-lg`} />
      </Section>
    </>
  )
}

function IconDocs() {
  return (
    <>
      <Text tone="muted">Icon primitive wraps Google Material Symbols with alias resolution and optional filled mode.</Text>
      <Section title="Examples">
        <Example title="Basic" code={`<I>arrow</I>\n<I>expand_more</I>`}>
          <Row>
            <I>arrow</I>
            <I>expand_more</I>
            <I>check_circle</I>
          </Row>
        </Example>
        <Example title="Filled" code={`<I filled>favorite</I>`}>
          <I filled>favorite</I>
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable rows={[
          { prop: 'children', type: 'string', defaultValue: 'required', description: 'Icon ligature name (alias supported).' },
          { prop: 'filled', type: 'boolean', defaultValue: 'false', description: 'Uses filled variant settings.' },
          { prop: 'className', type: 'string', defaultValue: '""', description: 'Class composition hook.' },
        ]} />
      </Section>
    </>
  )
}

function renderPage(pageId) {
  switch (pageId) {
    case 'button': return <ButtonDocs />
    case 'input': return <InputDocs />
    case 'textarea': return <TextAreaDocs />
    case 'checkbox': return <CheckboxDocs />
    case 'switch': return <SwitchDocs />
    case 'radiogroup': return <RadioGroupDocs />
    case 'select': return <SelectDocs />
    case 'calendar': return <CalendarDocs />
    case 'table': return <TableDocs />
    case 'tooltip': return <TooltipDocs />
    case 'modal': return <ModalDocs />
    case 'drawer': return <DrawerDocs />
    case 'layout': return <LayoutDocs />
    case 'card': return <CardDocs />
    case 'text': return <TextDocs />
    case 'themeprovider': return <ThemeProviderDocs />
    case 'icon': return <IconDocs />
    default: return <ButtonDocs />
  }
}

function App() {
  const [page, setPage] = useState(getPageFromHash())

  useEffect(() => {
    function onHashChange() {
      setPage(getPageFromHash())
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const current = PAGE_LIST.find((p) => p.id === page) ?? PAGE_LIST[0]

  return (
    <ThemeProvider>
      <div className="docs-app">
        <aside className="docs-sidebar">
          <Text className="docs-eyebrow" as="span" size="xs" weight="semibold" tone="muted">Neevo UI</Text>
          <Heading as="h1" size="md">Documentation</Heading>
          <Text size="sm" tone="muted">One component per page, deeply documented with live examples.</Text>
          <nav className="docs-nav">
            {PAGE_LIST.map((item) => (
              <a key={item.id} href={`#/${item.id}`} className={item.id === page ? 'docs-nav-link docs-nav-link--active' : 'docs-nav-link'}>
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        <main className="docs-main">
          <header className="docs-main-header">
            <Heading as="h1" size="xl">{current.label}</Heading>
            <Text tone="muted">Production-ready usage guidelines, API details, and implementation examples.</Text>
          </header>
          {renderPage(page)}
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
