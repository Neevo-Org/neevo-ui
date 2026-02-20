const ICON_ALIASES = {
  arrow: 'arrow_forward',
}

function getIconText(value) {
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value)
  }

  if (Array.isArray(value)) {
    return value.map((item) => getIconText(item)).join('')
  }

  if (value && typeof value === 'object') {
    if (value.props && value.props.children !== undefined) {
      return getIconText(value.props.children)
    }
    return ''
  }

  return ''
}

function resolveIconName(name) {
  const normalized = getIconText(name)
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
