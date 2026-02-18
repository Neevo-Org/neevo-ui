import { useState } from 'react'
import {
  Input,
  Options,
  Select,
  Text
} from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

export function SelectDocPage() {
  const [asset, setAsset] = useState('btc')
  const [interval, setInterval] = useState('1d')
  return (
    <>
      <Text tone="muted">Select uses declarative <code>Options</code> children, optional search, and composable keyword filtering.</Text>
      <Section title="Examples">
        <Example
          title="Searchable"
          code={`<Select value={asset} onChange={setAsset} search>\n  <Options value="btc" keywords="bitcoin">BTC</Options>\n</Select>`}
        >
          <Select value={asset} onChange={setAsset} search placeholder="Choose asset">
            <Options value="btc" keywords="bitcoin crypto">BTC / USD</Options>
            <Options value="eth" keywords="ethereum crypto">ETH / USD</Options>
            <Options value="sol" keywords="solana">SOL / USD</Options>
          </Select>
        </Example>
        <Example
          title="Non-searchable"
          code={`<Select value={interval} onChange={setInterval} search={false}>...</Select>`}
        >
          <Select value={interval} onChange={setInterval} search={false} placeholder="Choose interval">
            <Options value="1h">1 Hour</Options>
            <Options value="4h">4 Hours</Options>
            <Options value="1d">1 Day</Options>
            <Options value="1w">1 Week</Options>
          </Select>
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable rows={[
          { prop: 'search', type: 'boolean', defaultValue: 'true', description: 'Enables search input and filtering.' },
          { prop: 'searchable', type: 'boolean', defaultValue: 'undefined', description: 'Backward-compatible alias; overrides search when provided.' },
          { prop: 'value', type: 'string', defaultValue: 'undefined', description: 'Selected option value.' },
          { prop: 'onChange', type: '(value) => void', defaultValue: 'undefined', description: 'Selection change callback.' },
          { prop: 'placeholder', type: 'string', defaultValue: '"Select an option"', description: 'Placeholder text.' },
        ]} />
      </Section>
    </>
  )
}


