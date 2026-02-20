import { Text } from '../../typography/Text'
import './Divider.css'

export function Divider({ orientation = 'horizontal', label, className = '', ...props }) {
  const classes = ['nv-divider', `nv-divider--${orientation}`, className].filter(Boolean).join(' ')
  if (orientation === 'vertical') {
    return <span className={classes} role="separator" aria-orientation="vertical" {...props} />
  }

  return (
    <div className={classes} role="separator" aria-orientation="horizontal" {...props}>
      {label ? <Text as="span" size="xs" tone="muted" className="nv-divider-label">{label}</Text> : null}
    </div>
  )
}

