import './Badge.css'

export function Badge({ children, tone = 'neutral', variant = 'soft', className = '', ...props }) {
  const classes = ['nv-badge', `nv-badge--${tone}`, `nv-badge--${variant}`, className].filter(Boolean).join(' ')
  return <span className={classes} {...props}>{children}</span>
}

