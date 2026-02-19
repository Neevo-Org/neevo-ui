# Select

Select uses declarative <code>Options</code> children, optional search, and composable keyword filtering.

## Examples

### Searchable

```tsx
import { useState } from 'react'

function SelectExample() {
  const [asset, setAsset] = useState('btc')

  return (
    <Column gap={8}>
      <Text size="sm" tone="muted">Selected asset: {asset.toUpperCase()}</Text>
      <Select value={asset} onChange={setAsset} search>
        <Options value="btc" keywords="bitcoin">BTC</Options>
        <Options value="eth" keywords="ethereum">ETH</Options>
        <Options value="sol" keywords="solana">SOL</Options>
      </Select>
    </Column>
  )
}

<SelectExample />
```

### Non-searchable

```tsx
import { useState } from 'react'

function NonSearchableSelectExample() {
  const [interval, setInterval] = useState('1d')

  return (
    <Column gap={8}>
      <Text size="sm" tone="muted">Selected interval: {interval}</Text>
      <Select value={interval} onChange={setInterval} search={false}>
        <Options value="1h">1 Hour</Options>
        <Options value="1d">1 Day</Options>
        <Options value="1w">1 Week</Options>
      </Select>
    </Column>
  )
}

<NonSearchableSelectExample />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| search | boolean | true | Enables search input and filtering. |
| searchable | boolean | undefined | Backward-compatible alias; overrides search when provided. |
| value | string | undefined | Selected option value. |
| onChange | (value) => void | undefined | Selection change callback. |
| placeholder | string | "Select an option" | Placeholder text. |
