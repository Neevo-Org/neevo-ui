# I (Icons)

Icon primitive wraps Google Material Symbols with alias resolution and optional filled mode.

## Examples

### Basic

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: Basic.</Text>
  <Column gap={8}>
    <I>arrow</I>
    <I>expand_more</I>
  </Column>
</Column>
```

### Filled

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: Filled.</Text>
  <Column gap={8}>
    <I filled>favorite</I>
  </Column>
</Column>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| children | string | required | Icon ligature name (alias supported). |
| filled | boolean | false | Uses filled variant settings. |
| className | string | "" | Class composition hook. |
