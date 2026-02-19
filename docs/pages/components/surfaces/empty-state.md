# EmptyState

EmptyState gives a reusable no-content message with icon and optional action.

## Examples

### With Action

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: With Action.</Text>
  <Column gap={8}>
    <EmptyState
      icon="inbox"
      title="No reports yet"
      description="Generate your first report to see data."
      actionLabel="Create report"
    />
  </Column>
</Column>
```

### Custom Action Slot

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: Custom Action Slot.</Text>
  <Column gap={8}>
    <EmptyState action={<Button>Connect</Button>} />
  </Column>
</Column>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| icon | string | "inbox" | Material icon name. |
| title | string | "No data yet" | Main heading text. |
| description | string | default helper text | Supporting explanation text. |
| actionLabel / onAction | string / function | undefined | Quick CTA button API. |
| action | ReactNode | undefined | Fully custom action slot. |
