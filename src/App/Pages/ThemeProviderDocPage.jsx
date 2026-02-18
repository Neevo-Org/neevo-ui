import {
  Button,
  Card,
  CardBody,
  Row,
  Text,
  ThemeProvider
} from '../../lib'
import { CodeBlock } from '../../lib/codeblock'
import { Example, PropsTable, Section } from './components/DocsBits'

export function ThemeProviderDocPage() {
  return (
    <>
      <Text tone="muted">ThemeProvider scopes light/dark tokens and allows runtime CSS variable overrides for full branding control.</Text>
      <Section title="Examples">
        <Example title="Dark Mode Scope" code={`<ThemeProvider mode="dark">...</ThemeProvider>`}>
          <ThemeProvider mode="dark" className="docs-dark-sample">
            <Card>
              <CardBody>
                <Text tone="muted">Dark themed card section</Text>
                <Button>Primary Action</Button>
              </CardBody>
            </Card>
          </ThemeProvider>
        </Example>
        <Example title="Brand Override" code={`<ThemeProvider style={{ '--nv-color-primary-bg': '#22c55e' }}>...</ThemeProvider>`}>
          <ThemeProvider
            className="docs-brand-sample"
            style={{
              '--nv-color-primary-bg': '#22c55e',
              '--nv-color-primary-bg-hover': '#16a34a',
              '--nv-color-primary-fg': '#052e16',
            }}
          >
            <Row>
              <Button>Green Brand</Button>
              <Button variant="secondary">Secondary</Button>
            </Row>
          </ThemeProvider>
        </Example>
      </Section>
      <Section title="Core Tokens">
        <CodeBlock code={`--nv-color-bg\n--nv-color-surface\n--nv-color-text\n--nv-color-primary-bg\n--nv-color-primary-fg\n--nv-color-border\n--nv-shadow-sm\n--nv-radius-md / --nv-radius-lg`} />
      </Section>
    </>
  )
}


