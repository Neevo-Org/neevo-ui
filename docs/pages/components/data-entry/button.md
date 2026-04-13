# Button

Buttons support stronger variant semantics, size presets, and full-width behavior while following the same surface language as the rest of the system.

## Examples

### Variants

```tsx
<Row gap={8} wrap>
  <Button>Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="danger">Danger</Button>
</Row>
```

### With Icon And Sizes

```tsx
<Column gap={8}>
  <Row gap={8} wrap>
    <Button size="sm" variant="secondary"><I>arrow_forward</I> Continue</Button>
    <Button size="md" variant="secondary"><I>download</I> Export</Button>
    <Button size="lg"><I>add</I> Create</Button>
  </Row>
  <Button fullWidth variant="secondary">Full width action</Button>
</Column>
```

### Disabled

```tsx
<Row gap={8} wrap>
  <Button disabled>Disabled</Button>
  <Button variant="secondary" disabled>Disabled secondary</Button>
</Row>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| variant | `"primary" \| "secondary" \| "ghost" \| "danger"` | `"primary"` | Visual style variant. |
| size | `"sm" \| "md" \| "lg"` | `"md"` | Button density preset. |
| fullWidth | boolean | false | Makes the button stretch to its container width. |
| type | `"button" \| "submit" \| "reset"` | `"button"` | Native button type. |
| disabled | boolean | false | Disables interaction. |
| className | string | `""` | Custom class composition. |
