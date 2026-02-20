# Button

Buttons support clear variant semantics and can be composed with icons and custom sizing classes.

## Examples

### Variants

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: Variants.</Text>
  <Column gap={8}>
    <Column gap={8}>
      <Text size="sm" tone="muted">Below are the primary and secondary button variants.</Text>
      <Row>
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
      </Row>
    </Column>
  </Column>
</Column>
```

### With Icon

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: With Icon.</Text>
  <Column gap={8}>
    <Button variant="secondary"><I>arrow</I> Continue</Button>
  </Column>
</Column>
```

### Disabled

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: Disabled.</Text>
  <Column gap={8}>
    <Button disabled>Disabled</Button>
  </Column>
</Column>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| variant | "primary" \| "secondary" | "primary" | Visual style variant. |
| type | "button" \| "submit" \| "reset" | "button" | Native button type. |
| disabled | boolean | false | Disables interaction. |
| className | string | "" | Custom class composition. |
