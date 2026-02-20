# Layout System

Layout system includes shell-level and micro-layout primitives: <code>Page</code>, <code>Container</code>, <code>Grid</code>, <code>Row</code>, <code>Column</code>.

## Examples

### Dashboard Composition

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: Dashboard Composition.</Text>
  <Column gap={8}>
    <Page>
      <Container width={960}>
        <Column gap={12}>
          <Row justify="space-between" align="center">
            <Text>Portfolio</Text>
            <Button variant="secondary">Refresh</Button>
          </Row>
          <Grid min={220} gap={12}>
            <Card><CardBody>Balance</CardBody></Card>
            <Card><CardBody>PnL</CardBody></Card>
            <Card><CardBody>Exposure</CardBody></Card>
          </Grid>
        </Column>
      </Container>
    </Page>
  </Column>
</Column>
```

## Props Quick Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| Page | component | - | Top-level shell wrapper with full-height grid behavior. |
| Container.width | number \| string | 1200 | Max content width. |
| Grid.min | number \| string | 220 | Min card width in responsive grid. |
| Row.align / justify / wrap | flex options | center / flex-start / true | Horizontal layout behavior. |
| Column.align / justify | flex options | stretch / flex-start | Vertical layout behavior. |
