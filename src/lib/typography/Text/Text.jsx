import { createElement } from 'react'
import './Text.css'

function buildClassName(parts) {
  return parts.filter(Boolean).join(' ')
}

export function Text({
  as = 'p',
  children,
  size = 'md',
  weight = 'regular',
  tone = 'default',
  align = 'left',
  className = '',
  ...props
}) {
  const classes = buildClassName([
    'nv-text',
    `nv-text--${size}`,
    `nv-text--${weight}`,
    `nv-text--${tone}`,
    `nv-text--align-${align}`,
    className,
  ])

  return createElement(as, { className: classes, ...props }, children)
}

export function Heading({
  as = 'h2',
  children,
  size = 'lg',
  tone = 'default',
  align = 'left',
  className = '',
  ...props
}) {
  const classes = buildClassName([
    'nv-heading',
    `nv-heading--${size}`,
    `nv-text--${tone}`,
    `nv-text--align-${align}`,
    className,
  ])

  return createElement(as, { className: classes, ...props }, children)
}
