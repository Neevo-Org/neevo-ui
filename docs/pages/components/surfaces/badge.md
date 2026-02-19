# Badge

Badge highlights statuses, labels, and compact metadata with semantic tones.

## Examples

### Tone Variants

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: Tone Variants.</Text>
  <Column gap={8}>
    <Row>
      <Badge>Neutral</Badge>
      <Badge tone="success">Success</Badge>
      <Badge tone="warning">Warning</Badge>
      <Badge tone="danger">Danger</Badge>
    </Row>
  </Column>
</Column>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| tone | "neutral" \| "success" \| "warning" \| "danger" | "neutral" | Semantic color tone. |
| variant | "soft" \| "outline" | "soft" | Fill style appearance. |
| children | ReactNode | undefined | Badge content. |
