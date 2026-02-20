# Table

Table supports internal sorting, sortable headers, numeric alignment, and semantic section primitives.

## Examples

### Internally Sorted Table

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Click column headers to sort positions.</Text>
  <Table defaultSort={{ key: 'pnl', direction: 'desc' }}>
    <TableCaption>Open positions</TableCaption>
    <TableHead>
      <TableRow>
        <TableCell as="th" sortable sortKey="symbol">Symbol</TableCell>
        <TableCell as="th" sortable sortKey="sector">Sector</TableCell>
        <TableCell as="th" sortable sortKey="price" numeric align="right">Price</TableCell>
        <TableCell as="th" sortable sortKey="pnl" numeric align="right">24h PnL</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell sortKey="symbol" sortValue="NVDA">NVDA</TableCell>
        <TableCell sortKey="sector" sortValue="Semiconductors">Semiconductors</TableCell>
        <TableCell sortKey="price" sortValue={920.12} numeric align="right">$920.12</TableCell>
        <TableCell sortKey="pnl" sortValue={3.1} numeric align="right">+3.10%</TableCell>
      </TableRow>
      <TableRow>
        <TableCell sortKey="symbol" sortValue="AAPL">AAPL</TableCell>
        <TableCell sortKey="sector" sortValue="Consumer Tech">Consumer Tech</TableCell>
        <TableCell sortKey="price" sortValue={188.45} numeric align="right">$188.45</TableCell>
        <TableCell sortKey="pnl" sortValue={-0.8} numeric align="right">-0.80%</TableCell>
      </TableRow>
      <TableRow>
        <TableCell sortKey="symbol" sortValue="MSFT">MSFT</TableCell>
        <TableCell sortKey="sector" sortValue="Cloud">Cloud</TableCell>
        <TableCell sortKey="price" sortValue={417.9} numeric align="right">$417.90</TableCell>
        <TableCell sortKey="pnl" sortValue={1.4} numeric align="right">+1.40%</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</Column>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| defaultSort | { key: string, direction: "asc" \| "desc" } | { key: null, direction: "asc" } | Initial internal sort state. |
| sort / onSortChange | controlled sort API | undefined | Optional controlled sort mode. |
| sortKey | string | undefined | Sort identity for header and cell. |
| sortValue | string \| number | children | Value used during sort comparison. |
