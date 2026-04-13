import './Badge.css'

export function Badge({
  children,
  tone = 'neutral',
  variant = 'soft',
  size = 'md',
  dot = false,
  className = '',
  ...props
}) {
  const classes = ['nv-badge', `nv-badge--${tone}`, `nv-badge--${variant}`, `nv-badge--${size}`, dot && 'nv-badge--dot', className]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={classes} {...props}>
      {dot ? <span className="nv-badge__dot" aria-hidden="true" /> : null}
      <span className="nv-badge__label">{children}</span>
    </span>
  )
}
