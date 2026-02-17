import { useState } from 'react'
import { Column, RangeSlider, Slider, Text } from '../../lib'
import { Example, PropsTable, Section } from './components/DocsBits'

export function SliderDocPage() {
  const [single, setSingle] = useState(42)
  const [range, setRange] = useState([25, 75])

  return (
    <>
      <Text tone="muted">Slider and RangeSlider let users select one value or a bounded interval from a numeric range.</Text>
      <Section title="Examples">
        <Example
          title="Single + Range"
          code={`<Slider label="Opacity" min={0} max={100} value={single} onChange={setSingle} />\n<RangeSlider label="Price" min={0} max={200} value={range} onChange={setRange} />`}
        >
          <Column>
            <Slider
              label="Opacity"
              min={0}
              max={100}
              value={single}
              onChange={setSingle}
              hint="Select one value."
            />
            <RangeSlider
              label="Price Range"
              min={0}
              max={200}
              step={5}
              value={range}
              onChange={setRange}
              hint="Select min and max."
            />
          </Column>
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable rows={[
          { prop: 'min / max / step', type: 'number', defaultValue: '0 / 100 / 1', description: 'Numeric boundaries and increment.' },
          { prop: 'value', type: 'number | [number, number]', defaultValue: 'undefined', description: 'Controlled current value(s).' },
          { prop: 'defaultValue', type: 'number | [number, number]', defaultValue: '0 / [20, 80]', description: 'Initial value(s) in uncontrolled mode.' },
          { prop: 'onChange', type: '(value, event) => void', defaultValue: 'undefined', description: 'Called when slider value changes.' },
          { prop: 'showValue', type: 'boolean', defaultValue: 'true', description: 'Shows current value labels.' },
        ]} />
      </Section>
    </>
  )
}

