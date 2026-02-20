import { createElement } from 'react'

export function ThemeProvider({
  children,
  mode = 'light',
  className = '',
  as = 'div',
  ...props
}) {
  const classes = ['nv-theme', className].filter(Boolean).join(' ')

  return createElement(as, { className: classes, 'data-nv-mode': mode, ...props }, children)
}
