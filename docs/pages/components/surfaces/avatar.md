# Avatar

Avatar displays profile photos with robust fallback initials when no image is available.

## Examples

### Sizes + Fallback

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: Sizes + Fallback.</Text>
  <Column gap={8}>
    <Row>
      <Avatar name="Neevo UI" size="sm" />
      <Avatar name="Neevo UI" size="md" />
      <Avatar name="Neevo UI" size="lg" />
    </Row>
  </Column>
</Column>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| src | string | undefined | Image URL source. |
| name | string | "" | Used to generate initials fallback. |
| fallback | string | undefined | Manual fallback text override. |
| size | "sm" \| "md" \| "lg" | "md" | Avatar size variant. |
