import * as React from 'react'

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code?: string
  language?: string
  theme?: 'auto' | 'light' | 'dark'
  showLineNumbers?: boolean
  wrapLongLines?: boolean
  copyable?: boolean
}

export const CodeBlock: React.ComponentType<CodeBlockProps>
