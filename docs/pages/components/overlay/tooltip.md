# Tooltip

Tooltip is flexible: multiple trigger types, delays, placements, portal rendering, and interactive content mode.

## Examples

### Hover

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: Hover.</Text>
  <Column gap={8}>
    <Tooltip content="Quick info"><Button>Hover</Button></Tooltip>
  </Column>
</Column>
```

### Click + Rich Content

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: Click + Rich Content.</Text>
  <Column gap={8}>
    <Tooltip
      trigger="click"
      interactive
      placement="bottom-start"
      content={
        <Column gap={4}>
          <Text size="sm">Market opens in 12 minutes.</Text>
          <Button size="sm">Set reminder</Button>
        </Column>
      }
    >
      <Button variant="secondary">Details</Button>
    </Tooltip>
  </Column>
</Column>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| trigger | "hover" \| "focus" \| "click" \| array | ["hover","focus"] | Opener events. |
| placement | top/bottom/left/right + -start/-end | "top" | Position strategy. |
| interactive | boolean | false | Keeps tooltip open while pointer is over panel. |
| showDelay / hideDelay | number (ms) | 120 / 80 | Timing behavior. |
