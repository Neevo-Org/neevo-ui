# Card

Card family composes content regions with consistent spacing and optional elevated style.

## Examples

### Structured Card

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: Structured Card.</Text>
  <Card>
    <CardHeader>
      <Row align="center" justify="between">
        <Column gap={2}>
          <Heading as="h3" size="sm">Portfolio Snapshot</Heading>
          <Text size="sm" tone="muted">Updated 2 minutes ago</Text>
        </Column>
        <Badge tone="success">+4.28%</Badge>
      </Row>
    </CardHeader>
    <CardBody>
      <Column gap={6}>
        <Text size="sm">Total value: <strong>$124,860</strong></Text>
        <Text size="sm" tone="muted">Top mover: NVDA +3.1% today</Text>
      </Column>
    </CardBody>
    <CardFooter>
      <Row gap={8} justify="end">
        <Button variant="secondary">View holdings</Button>
        <Button>Rebalance</Button>
      </Row>
    </CardFooter>
  </Card>
</Column>
```

### Flat Card

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: Flat Card.</Text>
  <Column gap={8}>
    <Card elevated={false}>
      <CardBody>
        <Text tone="muted">Flat card with no shadow.</Text>
      </CardBody>
    </Card>
  </Column>
</Column>
```
