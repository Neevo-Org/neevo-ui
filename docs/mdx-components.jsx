/* eslint-disable react-refresh/only-export-components */
import { useMemo, useState } from 'react'
import * as ReactRuntime from 'react'
import JsxParser from 'react-jsx-parser'
import { LiveError, LivePreview, LiveProvider } from 'react-live'
import * as NeevoUi from '../src/lib'
import {
  Card,
  CardBody,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Text,
} from '../src/lib'
import { CodeBlock } from '../src/lib/codeblock'

function isSafeScopeKey(key) {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key) && key !== 'default'
}

function mergeSafeScope(...parts) {
  const scope = {}
  for (const part of parts) {
    for (const [key, value] of Object.entries(part ?? {})) {
      if (!isSafeScopeKey(key)) continue
      scope[key] = value
    }
  }
  return scope
}

const LIVE_SCOPE = mergeSafeScope(
  { React: ReactRuntime },
  ReactRuntime,
  NeevoUi,
)

const noop = () => {}

const LIVE_BINDINGS = {
  Fragment: ReactRuntime.Fragment,
  noop,
  date: new Date(),
  setDate: noop,
  open: true,
  setOpen: noop,
  mode: 'review',
  setMode: noop,
  state: true,
  sync: true,
  setSync: noop,
  tags: ['React', 'Docs'],
  setTags: noop,
  value: 'one',
  setValue: noop,
  asset: 'btc',
  setAsset: noop,
  interval: '1d',
  setInterval: noop,
  single: 42,
  setSingle: noop,
  range: [20, 80],
  setRange: noop,
  page: 3,
  setPage: noop,
  setLastAction: noop,
  snippet: '<Button variant="secondary">Action</Button>',
  items: [
    { label: 'Home', href: '#' },
    { label: 'Components', href: '#' },
    { label: 'Current', href: '#' },
  ],
  steps: [
    { title: 'Start' },
    { title: 'Review' },
    { title: 'Finish' },
  ],
  commands: [
    { id: 'open-settings', label: 'Open settings', group: 'General', shortcut: 'G S' },
    { id: 'new-file', label: 'New file', group: 'General', shortcut: 'N F' },
  ],
}

function normalizeLiveCode(code) {
  const preprocessed = code
    .replace(/\{\s*\.\.\.\s*\}/g, '{noop}')
    .replace(/\s\.\.\.\s*/g, ' ')
    .replace(/>\s*\.\.\.\s*</g, '>Example<')

  const trimmed = preprocessed.trim()
  if (!trimmed) return ''

  if (trimmed.startsWith('<')) {
    return `<Fragment>${trimmed}</Fragment>`
  }
  return trimmed
}

function normalizeLiveRuntimeCode(code) {
  const raw = code
    .replace(/\{\s*\.\.\.\s*\}/g, '{noop}')
    .replace(/\s\.\.\.\s*/g, ' ')
    .replace(/>\s*\.\.\.\s*</g, '>Example<')

  const cleanedLines = []
  let exportDefaultSplit = false
  for (const line of raw.split('\n')) {
    const trimmed = line.trimStart()
    if (!trimmed) {
      cleanedLines.push(line)
      continue
    }
    if (trimmed.startsWith('import ')) {
      continue
    }
    if (trimmed === 'export default') {
      exportDefaultSplit = true
      continue
    }
    if (trimmed.startsWith('export default ')) {
      cleanedLines.push(line.replace(/^\s*export\s+default\s+/, ''))
      exportDefaultSplit = false
      continue
    }
    if (trimmed.startsWith('export ')) {
      cleanedLines.push(line.replace(/^\s*export\s+/, ''))
      exportDefaultSplit = false
      continue
    }
    if (exportDefaultSplit && trimmed.startsWith('default ')) {
      cleanedLines.push(line.replace(/^\s*default\s+/, ''))
      exportDefaultSplit = false
      continue
    }
    if (trimmed.startsWith('default ')) {
      cleanedLines.push(line.replace(/^\s*default\s+/, ''))
      exportDefaultSplit = false
      continue
    }
    exportDefaultSplit = false
    cleanedLines.push(line)
  }

  let runtime = cleanedLines.join('\n').trim()

  const prelude = ''

  if (/\brender\s*\(/.test(runtime)) {
    return `${prelude}${runtime}`
  }

  const runtimeLines = runtime.split('\n')
  while (runtimeLines.length && !runtimeLines[runtimeLines.length - 1].trim()) {
    runtimeLines.pop()
  }
  const lastLine = runtimeLines[runtimeLines.length - 1]?.trim() ?? ''
  if (lastLine.startsWith('<') && lastLine.endsWith('>')) {
    const body = runtimeLines.slice(0, -1).join('\n').trim()
    if (body) {
      return `${prelude}${body}\nrender(${lastLine})`
    }
    return `${prelude}render(${lastLine})`
  }

  if (runtime.startsWith('<')) {
    return `${prelude}render(<React.Fragment>${runtime}</React.Fragment>)`
  }

  const namedComponent = runtime.match(/function\s+([A-Z][A-Za-z0-9_]*)\s*\(/)?.[1]
  if (namedComponent) {
    return `${prelude}${runtime}\nrender(<${namedComponent} />)`
  }

  return `${prelude}${runtime}`
}

function canRunAsLiveSnippet(code, language) {
  if (language !== 'tsx') return false
  return Boolean(code.trim())
}

function MarkdownExample({ code, language }) {
  const liveCode = useMemo(() => normalizeLiveCode(code), [code])
  const runtimeCode = useMemo(() => normalizeLiveRuntimeCode(code), [code])
  const isTsxLike = language === 'tsx'
  const isRenderable = canRunAsLiveSnippet(code, language)
  const prefersRuntime =
    /\b(import|export)\b/.test(code) ||
    /\buse(State|Effect|Memo|Callback|Ref)\s*\(/.test(code) ||
    /\bfunction\s+[A-Z]/.test(code)
  const [liveError, setLiveError] = useState('')
  const snippetTag = useMemo(
    () => `${language}:${code.split('\n')[0]?.trim().slice(0, 80) || '<empty>'}`,
    [code, language],
  )

  if (!isTsxLike) {
    return <CodeBlock code={code} language={language} showLineNumbers />
  }

  return (
    <Card className="docs-example-card">
      <CardBody>
        <div className="docs-preview">
          {isRenderable && !prefersRuntime ? (
            <JsxParser
              jsx={liveCode}
              components={LIVE_SCOPE}
              bindings={LIVE_BINDINGS}
              renderInWrapper={false}
              onError={(error) => {
                const message = error?.message || String(error)
                setLiveError(message)
                console.error('[docs-live] parser error', { snippetTag, message, liveCode })
              }}
            />
          ) : isRenderable ? (
            <LiveProvider
              code={runtimeCode}
              scope={LIVE_SCOPE}
              noInline
              onError={(error) => {
                const message = error?.message || String(error)
                setLiveError(message)
                console.error('[docs-live] runtime compile error', { snippetTag, message, runtimeCode })
              }}
            >
              <LiveError />
              <LivePreview
                onError={(error) => {
                  const message = error?.message || String(error)
                  setLiveError(message)
                  console.error('[docs-live] runtime error', { snippetTag, message, runtimeCode })
                }}
              />
            </LiveProvider>
          ) : (
            <Text className="docs-live-fallback" size="sm" tone="muted">
              Preview unavailable for this snippet. The code is still shown on the right.
            </Text>
          )}
          {liveError ? <Text className="docs-live-fallback" size="sm">Preview failed: {liveError}</Text> : null}
        </div>
        <CodeBlock code={code} language={language} showLineNumbers />
      </CardBody>
    </Card>
  )
}

function MdxCode({ children, className }) {
  const hasLanguage = typeof className === 'string' && className.startsWith('language-')
  if (!hasLanguage) {
    return <code className="docs-mdx-inline-code">{children}</code>
  }

  const language = className.replace('language-', '') || 'tsx'
  const code = typeof children === 'string' ? children : ''
  return <MarkdownExample code={code.trimEnd()} language={language} />
}

export const mdxComponents = {
  h1: (props) => (
    <div className="docs-mdx-h1-wrap">
      <Heading as="h1" size="xl" {...props} />
      <div className="docs-mdx-h1-divider" />
    </div>
  ),
  h2: (props) => <Heading as="h2" size="md" {...props} />,
  h3: (props) => <Heading as="h3" size="sm" {...props} />,
  p: (props) => <Text tone="muted" {...props} />,
  ul: (props) => <ul className="docs-list" {...props} />,
  table: (props) => (
    <div className="docs-table-wrap">
      <Table className="docs-table" {...props} />
    </div>
  ),
  thead: (props) => <TableHead {...props} />,
  tbody: (props) => <TableBody {...props} />,
  tr: (props) => <TableRow {...props} />,
  th: (props) => <TableCell as="th" {...props} />,
  td: (props) => <TableCell {...props} />,
  pre: (props) => <>{props.children}</>,
  code: (props) => <MdxCode {...props} />,
}
