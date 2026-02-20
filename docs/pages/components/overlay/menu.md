# Menu / DropdownMenu

Menu and DropdownMenu provide compact action lists anchored to a trigger button.

## Examples

### Dropdown Actions

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: Dropdown Actions.</Text>
  <Column gap={8}>
    <Menu>
      <MenuTrigger><Button variant="secondary">Actions</Button></MenuTrigger>
      <MenuContent>
        <MenuItem><I>edit</I> Edit</MenuItem>
        <MenuItem><I>share</I> Share</MenuItem>
        <MenuSeparator />
        <MenuItem><I>delete</I> Delete</MenuItem>
      </MenuContent>
    </Menu>
  </Column>
</Column>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| open / defaultOpen | boolean | false | Controlled or uncontrolled menu state. |
| onOpenChange | (open) => void | undefined | Called when menu opens or closes. |
| align | "start" \| "center" \| "end" | "start" | Horizontal alignment for content. |
| onSelect | (event) => void | undefined | Item click callback before close. |
