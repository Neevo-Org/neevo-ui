import './Layout.css'

function toCssSize(value, fallback) {
  if (value === undefined || value === null) {
    return fallback
  }
  return typeof value === 'number' ? `${value}px` : value
}

export function Layout({ children, gap = 16, className = '', style, ...props }) {
  const classes = ['nv-layout', className].filter(Boolean).join(' ')
  return (
    <section className={classes} style={{ '--nv-layout-gap': toCssSize(gap, '16px'), ...style }} {...props}>
      {children}
    </section>
  )
}

export function Container({ children, width = 1200, padding = 16, className = '', style, ...props }) {
  const classes = ['nv-container', className].filter(Boolean).join(' ')
  return (
    <div
      className={classes}
      style={{
        '--nv-container-width': toCssSize(width, '1200px'),
        '--nv-container-padding': toCssSize(padding, '16px'),
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export function Grid({ children, columns = 12, min = 220, gap = 16, className = '', style, ...props }) {
  const classes = ['nv-grid', className].filter(Boolean).join(' ')
  return (
    <div
      className={classes}
      style={{
        '--nv-grid-columns': columns,
        '--nv-grid-gap': toCssSize(gap, '16px'),
        '--nv-grid-min': toCssSize(min, '220px'),
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export function Row({
  children,
  gap = 12,
  align = 'center',
  justify = 'flex-start',
  wrap = true,
  className = '',
  style,
  ...props
}) {
  const classes = ['nv-row', className].filter(Boolean).join(' ')
  return (
    <div
      className={classes}
      style={{
        '--nv-row-gap': toCssSize(gap, '12px'),
        '--nv-row-align': align,
        '--nv-row-justify': justify,
        '--nv-row-wrap': wrap ? 'wrap' : 'nowrap',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export function Column({
  children,
  gap = 12,
  align = 'stretch',
  justify = 'flex-start',
  className = '',
  style,
  ...props
}) {
  const classes = ['nv-column', className].filter(Boolean).join(' ')
  return (
    <div
      className={classes}
      style={{
        '--nv-column-gap': toCssSize(gap, '12px'),
        '--nv-column-align': align,
        '--nv-column-justify': justify,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
