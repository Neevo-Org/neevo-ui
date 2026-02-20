# Input

Input supports restrictive numeric modes while keeping native browser constraints and full controlled behavior.

## Examples

### Text Input with Icons

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: Text Input with Icons.</Text>
  <Column gap={8}>
    <Input label="Email" leadingIcon="mail" trailingIcon="alternate_email" />
  </Column>
</Column>
```

### Integer Restriction

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: Integer Restriction.</Text>
  <Column gap={8}>
    <Input mode="integer" min={1} max={100} maxLength={3} />
  </Column>
</Column>
```

### Float Restriction

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: Float Restriction.</Text>
  <Column gap={8}>
    <Input mode="float" min={0} max={5} />
  </Column>
</Column>
```

### Disabled and Error

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: Disabled and Error.</Text>
  <Column gap={8}>
    <Input disabled value="Locked" />
    <Input error="Invalid value" />
  </Column>
</Column>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| mode | "text" \| "integer" \| "float" | "text" | Sanitization strategy during input. |
| min / max | number | undefined | Clamp limits for numeric modes on blur. |
| maxLength | number | undefined | Maximum character length (enforced). |
| disabled / dissabled | boolean | false | Disables field interaction. |
| leadingIcon / trailingIcon | string | undefined | Material icon names shown in input shell. |
| label / hint / error | string | undefined | Field metadata text. |
