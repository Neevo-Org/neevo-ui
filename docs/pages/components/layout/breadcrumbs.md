# Breadcrumbs

Breadcrumbs show hierarchical navigation and current position in the app structure.

## Examples

### Path Navigation

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: Path Navigation.</Text>
  <Column gap={8}>
    <Breadcrumbs
      items={[
        { label: 'Home', href: '#' },
        { label: 'Components', href: '#' },
        { label: 'Breadcrumbs', href: '#' },
      ]}
    />
  </Column>
</Column>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| items | Array<{ label, href?, key? }> | [] | Ordered breadcrumb items. |
| separator | string | "chevron_right" | Material icon name used as separator. |
