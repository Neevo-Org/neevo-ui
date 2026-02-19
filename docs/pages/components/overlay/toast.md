# Toast

Toast provides transient notifications for feedback and non-blocking alerts.

## Examples

### Toast Provider

```tsx
function ToastExample() {
  const { show } = useToast()

  return (
    <Button
      onClick={() => {
        show({
          title: 'Trade synced',
          description: 'Your position was updated successfully.',
          tone: 'success',
        })
      }}
    >
      Show toast
    </Button>
  )
}

function ToastProviderExample() {
  return (
    <ToastProvider>
      <Column gap={8}>
        <Text size="sm" tone="muted">Click the button to trigger a toast.</Text>
        <ToastExample />
      </Column>
    </ToastProvider>
  )
}

<ToastProviderExample />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| title | string | undefined | Toast title text. |
| description | string | undefined | Toast body text. |
| tone | "default" \| "success" \| "error" \| "warning" | "default" | Visual tone and default icon. |
| duration | number | 3200 | Auto-dismiss timeout in ms. |
