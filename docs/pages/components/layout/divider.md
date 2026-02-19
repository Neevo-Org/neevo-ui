# Divider

Divider separates related content blocks visually in horizontal or vertical orientation.

## Examples

### Horizontal + Vertical

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: Horizontal + Vertical.</Text>
  <Column gap={8}>
    <Column>
      <Text>Billing</Text>
      <Divider label="OR" />
      <Text>Personal</Text>
    </Column>
  </Column>
</Column>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| orientation | "horizontal" \| "vertical" | "horizontal" | Direction of the separator line. |
| label | string | undefined | Optional center label for horizontal divider. |
