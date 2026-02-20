# TextArea

TextArea mirrors Input styling with larger editable region and vertical resize support.

## Examples

### Basic Notes

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: Basic Notes.</Text>
  <Column gap={8}>
    <TextArea label="Trade note" rows={5} />
  </Column>
</Column>
```

### Error State

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: Error State.</Text>
  <Column gap={8}>
    <TextArea error="Please add at least 30 characters" />
  </Column>
</Column>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| rows | number | 4 | Initial visible text rows. |
| label / hint / error | string | undefined | Field metadata text. |
| className | string | "" | Wrapper class override. |
