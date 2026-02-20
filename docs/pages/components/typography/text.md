# Text / Heading

Typography primitives centralize text tone, weight, size, alignment, and heading scale.

## Examples

### Text Variants

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: Text Variants.</Text>
  <Column gap={8}>
    <Text size="xs" tone="muted">caption</Text>
    <Text size="md" weight="semibold">body</Text>
  </Column>
</Column>
```

### Heading Scale

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: Heading Scale.</Text>
  <Column gap={8}>
    <Heading as="h1" size="xl">Title</Heading>
  </Column>
</Column>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| Text.size | xs\|sm\|md\|lg | md | Text size token. |
| Text.weight | regular\|medium\|semibold\|bold | regular | Font weight token. |
| Text.tone | default\|muted | default | Color tone token. |
| Heading.size | sm\|md\|lg\|xl | lg | Heading scale token. |
