# Menu / DropdownMenu

Menu is for compact action lists anchored to a trigger. Use it for short, high-confidence actions rather than large content blocks.

## Examples

### Action Menu

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Compact action list anchored to a trigger.</Text>

  <Menu>
    <MenuTrigger>
      <Button variant="secondary">Actions</Button>
    </MenuTrigger>

    <MenuContent size="lg" surface="soft">
      <MenuItem><I>edit</I> Edit record</MenuItem>
      <MenuItem><I>content_copy</I> Duplicate</MenuItem>
      <MenuItem><I>ios_share</I> Share</MenuItem>
      <MenuSeparator />
      <MenuItem><I>archive</I> Archive</MenuItem>
      <MenuItem><I>delete</I> Delete</MenuItem>
    </MenuContent>
  </Menu>
</Column>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| open / defaultOpen | boolean | false | Controlled or uncontrolled menu state. |
| onOpenChange | `(open) => void` | undefined | Called when the menu opens or closes. |
| align | `'auto' \| 'start' \| 'center' \| 'end'` | `'auto'` | Horizontal alignment for the floating content. `auto` opens left-to-right by default and flips when space runs out. |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Width preset for the menu shell. |
| surface | `'default' \| 'soft' \| 'tint'` | `'default'` | Background treatment for the menu shell. |
| offset | number | 6 | Space between the trigger and content. |
| onSelect | `(event) => void` | undefined | Item click callback before close. |
