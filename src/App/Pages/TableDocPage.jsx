import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
  Text
} from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

export function TableDocPage() {
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


