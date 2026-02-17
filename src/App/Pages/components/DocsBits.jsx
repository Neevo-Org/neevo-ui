import {
  Card,
  CardBody,
  CardHeader,
  Column,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '../../../lib'
import { CodeBlock } from '../../../lib/codeblock'

export function PropsTable({ rows }) {
  return (
    <Column className="docs-table-wrap" gap={0}>
      <Table className="docs-table">
        <TableHead>
          <TableRow>
            <TableCell as="th">Prop</TableCell>
            <TableCell as="th">Type</TableCell>
            <TableCell as="th">Default</TableCell>
            <TableCell as="th">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.prop}>
              <TableCell><code>{row.prop}</code></TableCell>
              <TableCell><code>{row.type}</code></TableCell>
              <TableCell><code>{row.defaultValue}</code></TableCell>
              <TableCell>{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Column>
  )
}

export function Section({ title, children }) {
  return (
    <Column className="docs-section" gap={8}>
      <Heading as="h2" size="md">{title}</Heading>
      <div className="docs-section-body">{children}</div>
    </Column>
  )
}

export function Example({ title, children, code }) {
  return (
    <Card className="docs-example-card">
      <CardHeader>
        <Heading as="h3" size="sm">{title}</Heading>
      </CardHeader>
      <CardBody>
        <Column className="docs-preview" gap={10}>{children}</Column>
        <CodeBlock code={code} />
      </CardBody>
    </Card>
  )
}
