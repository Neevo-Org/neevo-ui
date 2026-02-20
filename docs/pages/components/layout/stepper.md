# Stepper

Stepper visualizes multi-step flows and highlights the current step in sequence.

## Examples

### Checkout Progress

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: Checkout Progress.</Text>
  <Column gap={8}>
    <Stepper
      steps={[
        { label: 'Draft' },
        { label: 'Review' },
        { label: 'Publish' },
      ]}
      current={2}
    />
  </Column>
</Column>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| steps | Array<{ label, key? }> | [] | Step items in display order. |
| current | number | 0 | Zero-based index of active step. |
