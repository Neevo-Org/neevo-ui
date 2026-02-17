export function ThemeProvider({
  children,
  mode = 'light',
  className = '',
  as: Tag = 'div',
  ...props
}) {
  const classes = ['nv-theme', className].filter(Boolean).join(' ')

  return (
    <Tag className={classes} data-nv-mode={mode} {...props}>
      {children}
    </Tag>
  )
}
