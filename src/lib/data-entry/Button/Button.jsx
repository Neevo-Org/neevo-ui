import './Button.css'

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  type = 'button',
  ...props
}) {
  const classes = ['nv-button', `nv-button--${variant}`, `nv-button--${size}`, fullWidth && 'nv-button--full-width', className]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}
