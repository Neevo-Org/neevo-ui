# Table

Table supports internal sorting, density presets, sticky headers, zebra rows, minimum width control, and stronger surface styling for real data views.

## Examples

### Data Table

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Click column headers to sort positions.</Text>

  <Table
    density="sm"
    surface="soft"
    zebra
    stickyHead
    minWidth={720}
    defaultSort={{ key: 'pnl', direction: 'desc' }}
  >
    <TableCaption>Open positions</TableCaption>
    <TableHead>
      <TableRow>
        <TableCell as="th" sortable sortKey="symbol">Symbol</TableCell>
        <TableCell as="th" sortable sortKey="sector">Sector</TableCell>
        <TableCell as="th" sortable sortKey="price" numeric align="right">Price</TableCell>
        <TableCell as="th" sortable sortKey="pnl" numeric align="right">24h PnL</TableCell>
        <TableCell as="th" align="right">Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell sortKey="symbol" sortValue="NVDA">NVDA</TableCell>
        <TableCell sortKey="sector" sortValue="Semiconductors">Semiconductors</TableCell>
        <TableCell sortKey="price" sortValue={920.12} numeric align="right">$920.12</TableCell>
        <TableCell sortKey="pnl" sortValue={3.1} numeric align="right">+3.10%</TableCell>
        <TableCell align="right">
          <Button variant="ghost">Open</Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sortKey="symbol" sortValue="AAPL">AAPL</TableCell>
        <TableCell sortKey="sector" sortValue="Consumer Tech">Consumer Tech</TableCell>
        <TableCell sortKey="price" sortValue={188.45} numeric align="right">$188.45</TableCell>
        <TableCell sortKey="pnl" sortValue={-0.8} numeric align="right">-0.80%</TableCell>
        <TableCell align="right">
          <Button variant="ghost">Open</Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sortKey="symbol" sortValue="MSFT">MSFT</TableCell>
        <TableCell sortKey="sector" sortValue="Cloud">Cloud</TableCell>
        <TableCell sortKey="price" sortValue={417.9} numeric align="right">$417.90</TableCell>
        <TableCell sortKey="pnl" sortValue={1.4} numeric align="right">+1.40%</TableCell>
        <TableCell align="right">
          <Button variant="ghost">Open</Button>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</Column>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| density | `'sm' \| 'md' \| 'lg'` | `'md'` | Cell density preset for the table shell. |
| compact | boolean | false | Legacy convenience prop that maps to `density="sm"`. |
| surface | `'default' \| 'soft' \| 'tint'` | `'default'` | Background treatment for the table shell. |
| zebra | boolean | false | Adds alternating row backgrounds. |
| hover | boolean | true | Enables row hover treatment. |
| stickyHead | boolean | false | Makes header cells sticky inside the scroll container. |
| minWidth | string \| number | `560` | Minimum table width before horizontal scrolling. |
| defaultSort | `{ key: string, direction: 'asc' \| 'desc' }` | `{ key: null, direction: 'asc' }` | Initial internal sort state. |
| sort / onSortChange | controlled sort API | undefined | Optional controlled sort mode. |

## Cell Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| sortable | boolean | false | Enables sort trigger rendering for header cells. |
| sortKey | string | undefined | Sort identity for header and body cells. |
| sortValue | string \| number | children | Value used during sort comparison. |
| numeric | boolean | false | Applies numeric alignment and tabular figures. |
| align | `'left' \| 'center' \| 'right'` | `'left'` | Text alignment for the cell. |
| sticky | boolean | false | Optional pinned cell behavior for leading or trailing columns. |
