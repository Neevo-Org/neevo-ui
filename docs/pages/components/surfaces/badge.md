# Badge

Badge highlights statuses, labels, and compact metadata with semantic tones, size presets, and variant styles.

## Examples

### Tone Variants

```tsx
<Column gap={8}>
  <Row gap={8} wrap>
    <Badge>Neutral</Badge>
    <Badge tone="primary">Primary</Badge>
    <Badge tone="success">Success</Badge>
    <Badge tone="warning">Warning</Badge>
    <Badge tone="danger">Danger</Badge>
  </Row>
</Column>
```

### Variants And Dot

```tsx
<Row gap={8} wrap>
  <Badge variant="soft" tone="success" dot>Synced</Badge>
  <Badge variant="outline" tone="warning">Pending review</Badge>
  <Badge variant="solid" tone="primary">Featured</Badge>
</Row>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| tone | `"neutral" \| "primary" \| "success" \| "warning" \| "danger"` | `"neutral"` | Semantic color tone. |
| variant | `"soft" \| "outline" \| "solid"` | `"soft"` | Fill style appearance. |
| size | `"sm" \| "md" \| "lg"` | `"md"` | Density preset. |
| dot | boolean | false | Adds a leading status dot. |
| children | ReactNode | undefined | Badge content. |
