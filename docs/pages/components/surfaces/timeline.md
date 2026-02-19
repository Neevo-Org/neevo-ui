# Timeline

Timeline displays chronological updates, events, and milestones in a vertical flow.

## Examples

### Release Timeline

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: Release Timeline.</Text>
  <Column gap={8}>
    <Timeline>
      <TimelineItem time="09:00" title="Draft ready" description="Initial API draft prepared." />
      <TimelineItem time="12:30" title="Review" description="Team reviewed the component contracts." />
      <TimelineItem time="16:10" title="Shipped" description="Release candidate published." />
    </Timeline>
  </Column>
</Column>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| title | string | undefined | Primary event title. |
| description | string | undefined | Supporting event text. |
| time | string | undefined | Timestamp or label for each item. |
