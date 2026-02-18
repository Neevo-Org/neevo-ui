import {
  Text
} from '../../lib'
import { CodeBlock } from '../../lib/codeblock'
import { Example, PropsTable, Section } from './components/DocsBits'

export function CodeBlockDocPage() {
  const snippet = `function sum(a, b) {\n  return a + b\n}\n\nconsole.log(sum(2, 3))`

  return (
    <>
      <Text tone="muted">
        CodeBlock is an optional component powered by <code>react-syntax-highlighter</code>.
        Install the peer dependency to use it.
      </Text>
      <Section title="Example">
        <Example
          title="Syntax Highlighting"
          code={`import { CodeBlock } from 'neevo-ui/codeblock'\n\n<CodeBlock code={snippet} language="javascript" />`}
        >
          <CodeBlock code={snippet} language="javascript" />
        </Example>
      </Section>
      <Section title="Props">
        <PropsTable rows={[
          { prop: 'code', type: 'string', defaultValue: '""', description: 'Source code content to render.' },
          { prop: 'language', type: 'string', defaultValue: '"tsx"', description: 'Syntax language identifier.' },
          { prop: 'theme', type: '"auto" | "light" | "dark"', defaultValue: '"auto"', description: 'Highlight theme mode.' },
          { prop: 'showLineNumbers', type: 'boolean', defaultValue: 'false', description: 'Shows line numbers.' },
          { prop: 'wrapLongLines', type: 'boolean', defaultValue: 'true', description: 'Wraps long lines.' },
        ]} />
      </Section>
    </>
  )
}


