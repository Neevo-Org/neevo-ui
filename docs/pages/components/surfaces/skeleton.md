# Skeleton

Skeleton is used as a loading placeholder for text, cards, avatars, and other content blocks.

## Examples

### Text + Avatar

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: Text + Avatar.</Text>
  <Column gap={8}>
    <Row>
      <Skeleton variant="circle" width={40} height={40} />
      <Column>
        <Skeleton width="60%" />
        <Skeleton width="85%" />
      </Column>
    </Row>
  </Column>
</Column>
```

### Card Placeholder

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: Card Placeholder.</Text>
  <Column gap={8}>
    <Card><CardBody><Skeleton variant="rect" height={120} /></CardBody></Card>
  </Column>
</Column>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| variant | "text" \| "rect" \| "circle" | "text" | Visual skeleton shape. |
| width / height | number \| string | depends on variant | Dimension overrides. |
| animate | boolean | true | Shimmer animation toggle. |
