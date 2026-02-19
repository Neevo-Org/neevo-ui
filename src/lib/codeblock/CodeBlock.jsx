import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useState } from 'react'
import { I } from '../typography/I'
import './CodeBlock.css'

function getThemeStyle(theme) {
  if (theme === 'dark') return oneDark
  if (theme === 'light') return oneLight
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? oneDark : oneLight
  }
  return oneLight
}

export function CodeBlock({
  code = '',
  language = 'tsx',
  theme = 'auto',
  showLineNumbers = true,
  wrapLongLines = true,
  copyable = true,
  className = '',
  style,
  ...props
}) {
  const [copied, setCopied] = useState(false)
  const classes = ['nv-code-block', className].filter(Boolean).join(' ')
  const highlighterStyle = getThemeStyle(theme)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      const area = document.createElement('textarea')
      area.value = code
      document.body.appendChild(area)
      area.select()
      document.execCommand('copy')
      document.body.removeChild(area)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <div className={classes}>
      {copyable && (
        <button
          type="button"
          className={copied ? 'nv-code-block__copy nv-code-block__copy--done' : 'nv-code-block__copy'}
          onClick={handleCopy}
          aria-label={copied ? 'Copied' : 'Copy code'}
          title={copied ? 'Copied' : 'Copy code'}
        >
          <I>{copied ? 'check' : 'content_copy'}</I>
        </button>
      )}
      <SyntaxHighlighter
        language={language}
        style={highlighterStyle}
        showLineNumbers={showLineNumbers}
        wrapLongLines={wrapLongLines}
        codeTagProps={{
          style: {
            background: 'transparent',
          },
        }}
        customStyle={{
          margin: 0,
          background: '#0f172a',
          color: '#dbeafe',
          borderRadius: '10px',
          padding: '0.75rem',
          paddingLeft: '0',
          fontSize: '0.84rem',
          lineHeight: 1.45,
          ...style,
        }}
        lineNumberStyle={{
          color: '#94a3b8',
          minWidth: '2rem',
          paddingRight: '0.75rem',
          userSelect: 'none',
        }}
        {...props}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
