# Progress

Progress communicates completion states for tasks, uploads, and async processes.

## Examples

### Linear + Circular

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: Linear + Circular.</Text>
  <Column gap={8}>
    <Column>
      <Progress value={64} />
      <Row>
        <CircularProgress value={64} showValue />
      </Row>
    </Column>
  </Column>
</Column>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | number | 0 | Progress percentage between 0 and 100. |
| size | number | 48 | Circular size in pixels. |
| stroke | number | 5 | Circular track stroke width. |
| showValue | boolean | false | Show centered percentage label. |
