const ICON_ALIASES = {
  arrow: 'arrow_forward',
}

function resolveIconName(name) {
  const normalized = String(name ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_')

  return ICON_ALIASES[normalized] ?? normalized
}

export function I({ children, className = '', filled = false, ...props }) {
  const name = resolveIconName(children)
  const classes = ['material-symbols-outlined', filled && 'nv-icon-filled', className]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={classes} aria-hidden {...props}>
      {name}
    </span>
  )
}
