import { useMemo, useState } from 'react'
import './Avatar.css'

function getInitials(name) {
  const parts = String(name ?? '').trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase()
}

export function Avatar({
  src,
  alt,
  name = '',
  size = 'md',
  fallback,
  className = '',
  ...props
}) {
  const [broken, setBroken] = useState(false)
  const initials = useMemo(() => fallback ?? getInitials(name), [fallback, name])
  const classes = ['nv-avatar', `nv-avatar--${size}`, className].filter(Boolean).join(' ')
  const resolvedAlt = alt ?? name ?? 'Avatar'

  return (
    <span className={classes} aria-label={resolvedAlt} {...props}>
      {src && !broken ? <img className="nv-avatar-image" src={src} alt={resolvedAlt} onError={() => setBroken(true)} /> : <span>{initials}</span>}
    </span>
  )
}

