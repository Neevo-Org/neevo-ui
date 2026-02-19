# ThemeProvider

ThemeProvider scopes light/dark tokens and allows runtime CSS variable overrides for full branding control.

## Examples

### Dark Mode Scope

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: Dark Mode Scope.</Text>
  <Column gap={8}>
    <ThemeProvider mode="dark">
      <Card>
        <CardBody>
          <Text>Dark themed content</Text>
        </CardBody>
      </Card>
    </ThemeProvider>
  </Column>
</Column>
```

### Brand Override

```tsx
<Column gap={8}>
  <Text size="sm" tone="muted">Example: Brand Override.</Text>
  <Column gap={8}>
    <ThemeProvider style={{ '--nv-color-primary-bg': '#22c55e' }}>
      <Button>Brand Action</Button>
    </ThemeProvider>
  </Column>
</Column>
```

## Core Tokens

Content migration in progress.
